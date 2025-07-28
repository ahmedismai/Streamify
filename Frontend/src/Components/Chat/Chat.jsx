import React, { useEffect, useState } from 'react'
import style from "./Chat.module.css"
import { useParams } from 'react-router-dom'
import useAuthUser from '../../hooks/useAuthUser'
import { getStreamToken } from '../../lib/api'
import { useQuery } from '@tanstack/react-query'
import {Channel, ChannelHeader , Chat, MessageInput, MessageList, Thread , Window} from "stream-chat-react"
import { toast } from 'react-hot-toast'
import ChatLoader from '../ChatLoader/ChatLoader'
import { StreamChat } from 'stream-chat'
import CallButton from '../CallButton/CallButton'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

export default function ChatPage() {
  const {id} = useParams()
  const [chatClient , setChatClient] = useState(null)
  const [channel , setChannel] = useState(null)
  const [loading , setLoading] = useState(true)
  const {authUser} =useAuthUser()
  const { data:tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser
  });

  useEffect(()=>{
    const initChat = async ()=>{
      if(!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client...");
        const client = StreamChat.getInstance(STREAM_API_KEY)
        await client.connectUser({
          id:authUser._id,
          name:authUser.name, 
          Image:authUser.profilePic
        }, tokenData.token)

        const channelId = [authUser._id ,id].sort().join("-")

        const currChannel = client.channel("messaging" ,channelId,{
          members:[authUser._id ,id],
        })

        await currChannel.watch()
        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.log("Error initializing chat::", error);
        toast.error("Could not connect to chat. please try again.")
      } finally{
        setLoading(false)
      }
    }
    initChat()
  },[tokenData , authUser, id])

  const handleVideoCall = async ()=>{
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`
      channel.sendMessage({
        text:`i'have started a video call. Join me here: ${callUrl}`
      })
      toast.success("Video call link send successfully")
    }
  }
  if (loading || !chatClient|| !channel) {
    return <ChatLoader/>
  }
  return (
    <div className='h-[93vh]'>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='w-full relative '>
            <CallButton handleVideoCall={handleVideoCall}/>
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus/>
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  )
}
