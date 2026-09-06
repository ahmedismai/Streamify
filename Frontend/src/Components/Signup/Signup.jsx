import React, { useState } from 'react'
import { ShipWheelIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import signup from "../../assets/images/Video-call-bro.png"
import { Register } from './../../lib/api.js';
import useHooksMutation from '../../hooks/useMutation'


export default function Signup() {
  const [signupData , setSignupData] = useState({
    fullName:"",
    email:"",
    password:""
  })
 
  const {isPending, error, mutate} = useHooksMutation(Register)
  
  const handleSignup = (e)=>{
    e.preventDefault()
    mutate(signupData)
  }
  return (
    <div className='streamify-auth-bg'>
      <div className='streamify-auth-card flex flex-col lg:flex-row'>

        <div className='w-full lg:w-1/2 p-6 sm:p-10 flex flex-col'>
          <div className='mb-8 flex justify-start items-center gap-3'>
            <span className='streamify-logo-mark'>
              <ShipWheelIcon className='size-6'/>
            </span>
            <span className='streamify-brand-text text-3xl'>
              Streamify
            </span>
          </div>

            {error && (
              <div className='alert alert-error mb-4'>
                <span>{error.response?.data?.message || "Could not connect to the server. Please try again."}</span>
              </div>
            )}


          <div className='w-full'>
            <form onSubmit={handleSignup}>
              <div className='space-y-5'>
                <div>
                  <h2 className='streamify-title'>
                    Create an Account
                  </h2>
                  <p className='streamify-subtitle'>
                    Join to Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className='space-y-4'>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Full Name</span>
                    </label>
                    <input type="text" placeholder='Enter your full name' className='input input-bordered streamify-input w-full'
                      value={signupData.fullName}
                      onChange={(e)=>{setSignupData({...signupData , fullName: e.target.value})}}
                      required
                    />
                  </div>

                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input type="email" placeholder='hello@example.com' className='input input-bordered streamify-input w-full'
                      value={signupData.email}
                      onChange={(e)=>{setSignupData({...signupData , email: e.target.value})}}
                      required
                    />
                  </div>

                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input type="password" placeholder='*********' className='input input-bordered streamify-input w-full'
                      value={signupData.password}
                      onChange={(e)=>{setSignupData({...signupData , password: e.target.value})}}
                      required
                    />
                    <p className='mt-2 text-xs opacity-65'>Password must be at least 6 Characters long </p>
                  </div>

                  <div className='form-control'>
                    <label className='label cursor-pointer justify-start gap-2 rounded-xl bg-base-200/70 px-3 py-3'>
                      <input type="checkbox" className='checkbox checkbox-sm' required />
                      <span className='text-xs leading-tight'>I agree to the{" "}</span>
                      <span className='text-xs text-primary hover:underline'>terms of service</span> and{" "}
                      <span className='text-xs text-primary hover:underline'>privacy policy</span>
                    </label>
                  </div>
                </div>

                <button className='btn btn-primary w-full min-h-12 rounded-xl' type='submit'>{isPending ? (<>
                <span className='loading loading-spinner loading-xs'></span>
                  Loading...
                </>): (
                  "Create Account "
                )}</button>

                <div className='text-center'>
                  <p className='text-sm '>
                    Already have an account?{" "}
                    <Link to={"/login"} className='text-primary hover:underline'>
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
              
            </form>
          </div>
        </div>

        <div className='streamify-auth-visual hidden lg:flex w-full lg:w-1/2 items-center justify-center'>
          <div className='max-w-md p-8 '>
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src={signup} alt="language connection illustration" className='w-full h-full drop-shadow-2xl' />
            </div>

            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-2xl font-bold'>Connect with language partners worldwide</h2>
              <p className='opacity-70'>Practice conversations, make friends, and improve your language skills together</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
