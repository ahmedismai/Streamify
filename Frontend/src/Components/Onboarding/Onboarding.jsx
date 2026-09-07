import React from 'react'
import useAuthUser from '../../hooks/useAuthUser.js'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { completeOnboarding } from '../../lib/api.js'
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react'
import { LANGUAGES } from '../../constants/index.js'
import useHooksMutation from '../../hooks/useMutation.js'
import Avatar from '../Avatar/Avatar.jsx'




export default function Onboarding() {
  const { authUser}=useAuthUser()
  const [formState , setFormState] = useState({
    fullName: authUser?.name || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  })

  const {isPending, mutate} = useHooksMutation(completeOnboarding)
  

  const handleSubmit = (e)=>{
    e.preventDefault();
    mutate(formState)
  }
  const handleRandomAvatar = ()=>{
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`

    setFormState({...formState , profilePic:randomAvatar});
    toast.success("Random profile picture generated!")
  }

  return (
    <div className='streamify-auth-bg'>
      <div className='streamify-card w-full max-w-3xl'>
        <div className='p-6 sm:p-8'>
          <h1 className='streamify-title text-center mb-2'>
            Complete Your Profile
          </h1>
          <p className='streamify-subtitle text-center mx-auto mb-8'>
            Tell partners what you speak, what you are learning, and where conversations can begin.
          </p>
          <form onSubmit={handleSubmit} className='space-y-6 '>
            <div className='flex items-center justify-center flex-col space-y-4'>
              <div className='size-32 rounded-full bg-base-300 overflow-hidden shadow-xl'>
                {formState?.profilePic ? (
                  <Avatar
                    src={formState?.profilePic}
                    user={{ name: formState?.fullName, profilePic: formState?.profilePic }}
                    alt="Profile Preview"
                    size='size-32'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40'/>
                  </div>
                )}
              </div>

              <div className='flex items-center gap-2'>
                <button type='button' onClick={handleRandomAvatar} className='btn btn-accent rounded-xl'>
                  <ShuffleIcon className='size-4 mr-2'/>
                  Generate Random Avatar
                </button>
              </div>
            </div>

            <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Full Name</span>
                    </label>
                    <input type="text" name='fullName' placeholder='Enter Your Full Name' className='input input-bordered streamify-input w-full'
                      value={formState?.fullName}
                      onChange={(e)=>{setFormState({...formState , fullName: e.target.value})}}
                      required
                    />
              </div>

              <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Bio</span>
                    </label>
                    <input type="text" name='bio' 
                      placeholder='Tell other about yourself and your language learning goals '
                      className='textarea textarea-bordered streamify-input h-24 resize-none'
                      value={formState?.bio}
                      onChange={(e)=>{setFormState({...formState , bio: e.target.value})}}
                      required
                    />
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Native Language</span>
                  </label>
                  <select name="nativeLanguage"
                  value={formState?.nativeLanguage}
                  onChange={(e)=>setFormState({...formState , nativeLanguage: e.target.value})}
                  className='select select-bordered streamify-input w-full'
                  >
                    <option value="">
                      Select your native language 
                    </option>
                    {LANGUAGES.map((lang)=>(
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Learning Language</span>
                  </label>
                  <select name="learningLanguage"
                  value={formState?.learningLanguage}
                  onChange={(e)=>setFormState({...formState , learningLanguage: e.target.value})}
                  className='select select-bordered streamify-input w-full'
                  >
                    <option value="">
                      Select you're learning
                    </option>
                    {LANGUAGES.map((lang)=>(
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='form-control'>
                <label className='label'>
                    <span className='label-text'>Location</span>
                </label>
                <div className='relative'>
                    <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70'/>
                    <input type="text" 
                      name='location'
                      value={formState?.location}
                      onChange={(e)=>{setFormState({...formState , location: e.target.value})}}
                      className='input input-bordered streamify-input w-full pl-10'
                      placeholder='City, Country'
                    />
                </div>
              </div>

              <button className='btn btn-primary w-full min-h-12 rounded-xl' type='submit' disabled={isPending}>
                {!isPending ? (<>
                  <ShipWheelIcon className='size-5 mr-2'/>
                  Complete Onboarding
                </>): (
                  <>
                  <LoaderIcon className='animate-spin size-5 mr-2'/>
                  Onboarding...
                  </>
                )}</button>


          </form>
        </div>
      </div>
    </div>
  )
}
