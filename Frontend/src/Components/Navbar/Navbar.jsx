import React from 'react'
import useAuthUser from '../../hooks/useAuthUser'
import { Link, useLocation } from 'react-router-dom'
import { logout } from '../../lib/api'
import useHooksMutation from '../../hooks/useMutation'
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react'
import ThemesSelector from '../ThemesSelector/ThemesSelector'

export default function Navbar() {
    const {authUser} = useAuthUser()
    const location = useLocation()
    const isChatPage = location.pathname?.startsWith("/chat")
    const {isPending, error, mutate} = useHooksMutation(logout)
  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
        <div className='container mx-auto sm:px-6 lg:px-8'>
            <div className='flex items-center justify-end w-full'>
                {/* logo only in the chat page  */}
                {isChatPage && (
                <div className='pl-5'>
                <Link to={"/"} className='flex items-center gap-2.5'>
                    <ShipWheelIcon className='size-9 text-primary'/>
                    <span className='text-3xl font-mono font-bold text-transparent 
                        bg-gradient-to-r from-primary to-secondary bg-clip-text tracking-wider'>
                        Streamify
                    </span>
                </Link>
                </div>
            )}
            <div className='flex items-center gap-3 sm:gap-4 ml-auto'>
                <Link to={'/notifications'}>
                    <button className='btn btn-ghost btn-circle'>
                        <BellIcon className='size-6 text-base-content opacity-70'/>
                    </button>
                </Link>
            </div>
            
            <ThemesSelector/>

            <div className='avatar mx-2'>
                <div className='w-9 rounded-full'>
                    <img src={authUser?.profilePic} alt="User Avatar" rel='noreferrer' />
                </div>
            </div>

            <button className='btn btn-ghost btn-circle' onClick={mutate}>
                <LogOutIcon className='size-6 text-base-content opacity-70'/>
            </button>
            </div>
        </div>
    </nav>
  )
}
