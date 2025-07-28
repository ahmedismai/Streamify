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
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Your Friends</h2>
          <Link to="/notifications" className='btn btn-outline btn-sm'>
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
