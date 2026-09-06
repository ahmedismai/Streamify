import React from 'react'
import useQueryHooks from '../../hooks/useQuery'
import { acceptFriendRequest, getFriendRequest } from '../../lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from 'lucide-react'
import NoNotificationFound from '../NoNotificationFound/NoNotificationFound'
import Avatar from '../Avatar/Avatar'

export default function Notifications() {
  const queryClient = useQueryClient()
  const {data:friendRequest , isLoading} =useQueryHooks( getFriendRequest , "friendRequests")
  const {mutate:acceptRequestMutation , isPending} = useMutation({
    mutationFn:acceptFriendRequest,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["friendRequests"]})
      queryClient.invalidateQueries({queryKey:["friends"]})
    },
  })
  const inComingRequests =friendRequest?.inComingReqs || []
  const acceptedRequests =friendRequest?.acceptedReqs || []


  return (
    <div className='streamify-page'>
      <div className='max-w-4xl space-y-8'>
        <div>
          <h1 className='streamify-title mb-2'>Notifications</h1>
          <p className='streamify-subtitle'>Review new requests and recent language partner connections.</p>
        </div>
        {isLoading? (<>
        <div className='flex justify-center py-12'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
        </>) : (<>
        {inComingRequests.length > 0 && (
          <section className='space-y-4'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
              <UserCheckIcon className='size-5 text-primary'/>
              Friend Requests
              <span className='badge badge-primary ml-2 rounded-full'>{inComingRequests.length}</span>
            </h2>
            
            <div className='space-y-3'>
            {inComingRequests.map((request) => (
            <div key={request._id} className='streamify-card streamify-card-hover'>
              <div className='p-4'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                  <div className='flex items-center gap-3'>
                    <Avatar user={request.sender} alt={request.sender.name} size='size-14' />

                    <div className='min-w-0'>
                      <h3 className='font-semibold'>{request.sender.name}</h3>
                      <div className='flex flex-wrap gap-1.5 mt-1'>
                        <span className='badge streamify-badge badge-sm'>
                          Native: {request.sender.nativeLanguage}
                        </span>
                        <span className='badge streamify-badge streamify-badge-outline badge-sm'>
                          Learning: {request.sender.learningLanguage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className='btn btn-primary btn-sm rounded-xl'
                    onClick={() => acceptRequestMutation(request._id)}
                    disabled={isPending}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
            ))}

            </div>
          </section>
        )}
        {acceptedRequests.length > 0 && (
          <section className='space-y-4'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
              <BellIcon className='size-5 text-success'/>
              New Connections
            </h2>

            <div className='space-y-3'>
              {acceptedRequests.map((notification)=>(
                <div key={notification._id} className='streamify-card'>
                  <div className='p-4'>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-3'>
                      <Avatar user={notification.recipient} alt={notification.recipient.name} size='size-10' className='mt-1' />
                      <div className='flex-1 '>
                        <h3 className='font-semibold'>{notification.recipient.name}</h3>
                        <p className='text-sm my-1'> {notification.recipient.name} accepted your friend request</p>
                        <p className='text-xs flex items-center gap-1 opacity-70'><ClockIcon className='size-3'/> Recently</p>
                      </div>
                      <div className='badge badge-success rounded-full'><MessageSquareIcon className='h-3 w-3 mr-1'/> New Friend</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {inComingRequests.length === 0 && acceptedRequests.length === 0 && (
          <NoNotificationFound/>
        )}
        </>)}

      </div>
    </div>
  )
}
