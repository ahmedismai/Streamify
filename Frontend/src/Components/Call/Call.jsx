import React, { useEffect, useState } from 'react'
import style from "./Call.module.css"
import { useNavigate, useParams } from 'react-router-dom'
import useAuthUser from '../../hooks/useAuthUser'
import { useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../../lib/api'
import {
  StreamVideo, 
  StreamVideoClient, 
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks
} from "@stream-io/video-react-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { toast } from 'react-hot-toast'
import PageLoader from '../PageLoader/PageLoader'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY


export default function Call() {
  const {id} = useParams()
  const [client , setClient] = useState(null)
  const [call , setCall] = useState(null)
  const [isConnecting , setIsConnecting] = useState(true)
  const {authUser, isLoading}= useAuthUser()

  const { data:tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser
  });

  useEffect(()=>{
    const initCall = async ()=>{
      if (!tokenData?.token || !authUser || !id) return;

      try {
        console.log("Initializing stream video client...");
        
        const user ={
          id:authUser._id,
          name:authUser.name,
          image:authUser.profilePic
        }
        const videoClient = new StreamVideoClient({
          apiKey:STREAM_API_KEY,
          user,
          token:tokenData.token
        })
        const callInstance = videoClient.call("default", id);
        await callInstance.join({create:true})
        console.log("Joined call Successfully!");
        setClient(videoClient)
        setCall(callInstance)
      } catch (error) {
        console.log("Error joining call:",error)
        toast.error("Could not joined the call. please try again.")
      }finally{
        setIsConnecting(false)
      }
    }

    initCall()
  },[tokenData, authUser, id])

  if (isLoading || isConnecting) {
    return <PageLoader/>
  }
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='relative'> 
        {client && call ?(
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent/>
            </StreamCall>
          </StreamVideo>
        ):(
          <div className='flex items-center justify-center h-full'>
            <p>Could not initialize call. please refresh or try again latter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

const CallContent = ()=>{
  const {useCallCallingState} = useCallStateHooks()
  const callingState = useCallCallingState()
  const navigate = useNavigate()
  if (callingState === CallingState.LEFT) {
    return navigate("/")
  }

  return (
    <StreamTheme>
      <SpeakerLayout/>
        <CallControls/>
    </StreamTheme>
  )
}