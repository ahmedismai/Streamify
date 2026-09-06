import React from 'react';
import useQueryHooks from '../../hooks/useQuery';
import { getUserFriends } from '../../lib/api';
import FriendCard from '../FriendCard/FriendCard';
import { UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import NoFriendsFound from '../NoFriendsFound/NoFriendsFound';

export default function Friends() {
  const { data: friendsData = [], isLoading: loadingFriends } = useQueryHooks(getUserFriends, 'friends');

  return (
    <div className='streamify-page'>
      <div className='space-y-10'>
        <div className='streamify-section-head'>
          <div>
            <h2 className='streamify-title'>Your Friends</h2>
            <p className='streamify-subtitle'>Message a partner and keep your learning rhythm moving.</p>
          </div>
          <Link to="/notifications" className='btn btn-outline btn-sm rounded-xl'>
            <UsersIcon className='mr-2 size-4'/>
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>
        ) : friendsData.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {friendsData.map(friend => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
