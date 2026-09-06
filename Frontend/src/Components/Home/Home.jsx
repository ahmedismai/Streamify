import React, { useEffect, useState } from 'react';
import useQueryHooks from '../../hooks/useQuery';
import { getOutGoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../../lib/api';
import useHooksMutation from '../../hooks/useMutation';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from 'lucide-react';
import NoFriendsFound from '../NoFriendsFound/NoFriendsFound';
import { getLanguageFlag } from '../../lib/languageFlag.jsx';
import FriendCard from './../FriendCard/FriendCard';
import { capitalize } from './../../lib/utils';
import Avatar from '../Avatar/Avatar.jsx';


export default function Home() {
  const [outGoingRequestsIde, setOutGoingRequestsIde] = useState(new Set());

  const {data: friendsData = [], isLoading: loadingFriends} = useQueryHooks(getUserFriends, 'friends'); 
  const {data: recommendedUser = [], isLoading: loadingUsers} = useQueryHooks(getRecommendedUsers, 'users'); 
  const {data: outGoingFriendReqs = []} = useQueryHooks(getOutGoingFriendReqs, 'outGoingFriendReqs'); 
  const {isPending, mutate} = useHooksMutation(sendFriendRequest,"outGoingFriendReqs")

  useEffect(() => {    
    const outGoingReqsArr = outGoingFriendReqs?.outGoingReqs || [];
    const outGoingIds = new Set();
    outGoingReqsArr.forEach((req) => {
      if (req.recipient && req.recipient._id) {
        outGoingIds.add(req.recipient._id);
      }
    });
  
    setOutGoingRequestsIde(outGoingIds);
  }, [outGoingFriendReqs]);
  
  return (
    <div className='streamify-page'>
      <div className='space-y-10'>
        <div className='streamify-section-head'>
          <div>
            <h2 className='streamify-title'>Your Friends</h2>
            <p className='streamify-subtitle'>Keep conversations close and jump back into practice sessions quickly.</p>
          </div>
          <Link to={"/notifications"} className='btn btn-outline btn-sm rounded-xl'>
            <UsersIcon className='mr-2 size-4 '/>
            Friend Requests
          </Link>
        </div>
        {loadingFriends ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>
        ) :(
          friendsData.length === 0 ? (
            <NoFriendsFound/>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
              {friendsData.map((friend)=>(
                <FriendCard key={friend._id} friend={friend}/>
              ))}
            </div>
          )
        )}

        <section>
          <div className='mb-6 sm:mb-8'>
            <div className='streamify-section-head'>
              <div>
                <h2 className='streamify-title'>Meet New Learners</h2>
                <p className='streamify-subtitle'>Discover perfect language exchange partners based on your profile</p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>
        ) :(
          recommendedUser.length === 0 ? (
            <div className="streamify-empty">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content opacity-70 ">
                  Check back later for new language partners!
              </p>
          </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
              {recommendedUser.map((user)=>{
                const hasRequestBeenSent = outGoingRequestsIde.has(user._id)
                return (
                  <div key={user._id} className='streamify-card streamify-card-hover'>
                    <div className='p-5 space-y-4'>
                      <div className='flex items-center gap-3'>
                        <Avatar user={user} alt={user.name} size='size-16' />

                        <div className='min-w-0'>
                          <h3 className='font-semibold text-lg'>{user.name}</h3>
                          {user.location && (
                            <div className='flex items-center text-xs opacity-70 mt-1'>
                              <MapPinIcon className='size-3 mr-1'/>
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='flex flex-wrap gap-1.5'>
                        <span className='badge streamify-badge'>
                            {getLanguageFlag(user.nativeLanguage)}
                            Native: {capitalize(user.nativeLanguage)}
                        </span>
                        <span className='badge streamify-badge streamify-badge-outline'>
                            {getLanguageFlag(user.learningLanguage)}
                            Learning: {capitalize(user.learningLanguage)}
                        </span>
                    </div>
                    {user.bio && <p className='text-sm opacity-70'>{user.bio}</p>}

                    <button className={`btn w-full mt-2 rounded-xl ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"}`} 
                    onClick={() => {
                      mutate(user._id, {
                        onSuccess: () => {
                          setOutGoingRequestsIde(prev => new Set(prev).add(user._id));
                        }
                      });
                    }}
                    disabled={hasRequestBeenSent || isPending}
                    >
                      {hasRequestBeenSent ? (
                        <>
                        <CheckCircleIcon className='size-4 mr-2'/>
                        Requests Send
                        </>
                      ):(
                        <>
                        <UserPlusIcon className='size-4 mr-2'/>
                        Send Friend Request
                        </>
                      )}
                    </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        )}
        </section>

      </div>
    </div>
  );
}

