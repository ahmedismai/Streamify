import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon } from 'lucide-react';
import useAuthUser from '../../hooks/useAuthUser';
import useQueryHooks from '../../hooks/useQuery';
import { getFriendRequest } from '../../lib/api';
import Avatar from '../Avatar/Avatar';

export default function Sidebar() {
    const {authUser} = useAuthUser()
    const location = useLocation()
    const currentPath = location.pathname
    const {data:friendRequest} =useQueryHooks( getFriendRequest , "friendRequests")
  
  const inComingRequests =friendRequest?.inComingReqs || []
return (
    <aside className='streamify-sidebar w-72 border-r hidden lg:flex flex-col h-screen sticky top-0'>
        <div className='p-5 border-b border-base-300/60'>
            <Link to={"/"} className='flex items-center gap-2.5'>
                <span className='streamify-logo-mark'>
                    <ShipWheelIcon className='size-6'/>
                </span>
                <span className='streamify-brand-text text-2xl'>
                    Streamify
                </span>
            </Link>
        </div>
    <nav className='flex-1 p-4 space-y-2'>
        <Link to={"/"} className={`btn btn-ghost justify-start w-full gap-3 px-4 normal-case rounded-xl min-h-12 ${currentPath === "/" ? "btn-active bg-primary/15 text-primary":""}`}>
        <HomeIcon className='size-5 text-base-content opacity-70'/>
        <span>Home</span>
        </Link>
        <Link to={'/friends'} className={`btn btn-ghost justify-start w-full gap-3 px-4 normal-case rounded-xl min-h-12 ${currentPath === "/friends" ? "btn-active bg-primary/15 text-primary":""}`}>
        <UserIcon className='size-5 text-base-content opacity-70'/>
        <span>Friends</span>
        </Link>
        <Link to={'/notifications'} className={`btn btn-ghost justify-start w-full gap-3 px-4 normal-case rounded-xl min-h-12 ${currentPath === "/notifications" ? "btn-active bg-primary/15 text-primary":""}`}>
        <BellIcon className='size-5 text-base-content opacity-70'/>
        <span>Notifications</span>
        {inComingRequests?.length > 0 ? <span className='ml-auto bg-secondary text-secondary-content rounded-full size-6 text-xs font-bold flex items-center justify-center'>{inComingRequests?.length}</span> : ""}
        </Link>
    </nav>
    <div className='p-4 border-t border-base-300/60 mt-auto'>
        <div className='streamify-card p-3 flex items-center gap-3'>
            <Avatar user={authUser} size='size-11' />
            <div className='flex-1 min-w-0'>
                <p className='font-semibold text-sm'>{authUser?.name}</p>
                <p className='text-xs text-success flex items-center gap-1'>
                    <span className='size-2 rounded-full bg-success inline-block'></span>
                    Online
                </p>
            </div>
        </div>
    </div>
    </aside>
)
}
