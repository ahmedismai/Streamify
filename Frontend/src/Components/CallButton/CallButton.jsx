import React from 'react'
import { VideoIcon } from 'lucide-react'
export default function CallButton({handleVideoCall}) {
  return (
    <div className='p-3 flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0 right-0 z-10 pointer-events-none'>
        <button className='btn btn-success btn-sm text-success-content rounded-xl shadow-lg pointer-events-auto' onClick={handleVideoCall}>
            <VideoIcon className='size-5'/>
        </button>
    </div>
  )
}
