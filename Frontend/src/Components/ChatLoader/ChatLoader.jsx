import React from 'react'
import style from "./ChatLoader.module.css"
import { LoaderIcon } from 'react-hot-toast'
export default function ChatLoader() {
  return (
    <div className='h-screen flex flex-col items-center justify-center p-4'>
        <LoaderIcon className='animate-spin size-10 text-primary'/>
        <p className='mt-4 text-center text-lg font-mono'>Connecting to chat...</p>
    </div>
  )
}
