import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon } from 'lucide-react';
import useAuthUser from '../../hooks/useAuthUser';
import useQueryHooks from '../../hooks/useQuery';
import { getFriendRequest } from '../../lib/api';

export default function Sidebar() {
    const {authUser} = useAuthUser()
    const location = useLocation()
    const currentPath = location.pathname
    const {data:friendRequest , isLoading} =useQueryHooks( getFriendRequest , "friendRequests")
  
  const inComingRequests =friendRequest?.inComingReqs || []
return (
    <aside className='w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0'>
        <div className='p-5 border-b border-base-300 '>
            <Link to={"/"} className='flex items-center gap-2.5'>
                <ShipWheelIcon className='size-9 text-primary'/>
                <span className='text-3xl font-mono font-bold text-transparent 
                    bg-gradient-to-r from-primary to-secondary bg-clip-text tracking-wider'>
                    Streamify
                </span>
            </Link>
        </div>
    <nav className='flex-1 p-4 space-y-1'>
        <Link to={"/"} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active":""}`}>
        <HomeIcon className='size-5 text-base-content opacity-70'/>
        <span>Home</span>
        </Link>
        <Link to={'/friends'} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active":""}`}>
        <UserIcon className='size-5 text-base-content opacity-70'/>
        <span>Friends</span>
        </Link>
        <Link to={'/notifications'} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active":""}`}>
        <BellIcon className='size-5 text-base-content opacity-70'/>
        <span>Notifications</span>
        {inComingRequests?.length > 0 ? <span className='bg-emerald-500 rounded-full size-5 flex items-center justify-center'>{inComingRequests?.length}</span> : ""}
        </Link>
    </nav>
    <div className='p-4 border-t border-base-300 mt-auto'>
        <div className='flex items-center gap-3'>
            <div className='avatar'>
                <div className='w-10 rounded-full'>
                    <img src={authUser?.profilePic} alt="User Avatar" />
                </div>
            </div>
            <div className='flex-1'>
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
