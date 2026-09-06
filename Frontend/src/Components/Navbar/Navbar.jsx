import React from 'react'
import useAuthUser from '../../hooks/useAuthUser'
import { Link, useLocation } from 'react-router-dom'
import { getFriendRequest, logout } from '../../lib/api'
import useHooksMutation from '../../hooks/useMutation'
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react'
import ThemesSelector from '../ThemesSelector/ThemesSelector'
import useQueryHooks from '../../hooks/useQuery'
import Avatar from '../Avatar/Avatar'

export default function Navbar() {
    const {authUser} = useAuthUser()
    const location = useLocation()
    const isChatPage = location.pathname?.startsWith("/chat")
    const {mutate} = useHooksMutation(logout)


  const {data:friendRequest} =useQueryHooks( getFriendRequest , "friendRequests")
  
  const inComingRequests =friendRequest?.inComingReqs || []



  return (
    <nav className='streamify-topbar border-b sticky top-0 z-30 h-16 flex items-center'>
        <div className='w-full px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-end w-full'>
                {/* logo only in the chat page  */}
                
                {isChatPage && (
                <div className='pl-1'>
                <Link to={"/"} className='flex items-center gap-2.5'>
                    <span className='streamify-logo-mark'>
                        <ShipWheelIcon className='size-6'/>
                    </span>
                    <span className='streamify-brand-text text-xl sm:text-2xl'>
                        Streamify
                    </span>
                </Link>
                </div>
            )}
          
            <div className='flex items-center gap-2 sm:gap-4 ml-auto relative'>
                <Link to={'/notifications'} className='btn btn-ghost btn-circle hover:bg-primary/10' aria-label='Notifications'>
                        <BellIcon className='size-6 text-base-content opacity-70'/>
                        {inComingRequests?.length > 0 ? <span className='absolute top-4 left-5 bg-secondary text-secondary-content rounded-full size-5 text-xs font-bold flex items-center justify-center'>{inComingRequests?.length}</span> : ""}
                </Link>
            </div>
            
            <ThemesSelector/>

            <Avatar user={authUser} size='size-10' className='mx-2' />

            <button className='btn btn-ghost btn-circle hover:bg-secondary/10' onClick={mutate}>
                <LogOutIcon className='size-6 text-base-content opacity-70'/>
            </button>
            </div>
        </div>
    </nav>
  )
}
