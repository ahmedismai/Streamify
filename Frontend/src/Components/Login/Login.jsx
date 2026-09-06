import React, { useState } from 'react'
import { ShipWheelIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import login from "../../assets/images/Video-call-bro.png"
import { loginResponse } from './../../lib/api.js';
import useHooksMutation from '../../hooks/useMutation.js'


export default function Login() {
  const [loginData , setLoginData] = useState({
    email:"",
    password:""
  })
  const {isPending, error, mutate} = useHooksMutation(loginResponse)

  const handleLogin = (e)=>{
    e.preventDefault()
    mutate(loginData)
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
            <form onSubmit={handleLogin}>
              <div className='space-y-5'>
                <div>
                  <h2 className='streamify-title'>
                    Welcome Back
                  </h2>
                  <p className='streamify-subtitle'>
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className='space-y-4'>
                  
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input type="email" placeholder='hello@example.com' className='input input-bordered streamify-input w-full'
                      value={loginData.email}
                      onChange={(e)=>{setLoginData({...loginData , email: e.target.value})}}
                      required
                    />
                  </div>

                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input type="password" placeholder='*********' className='input input-bordered streamify-input w-full'
                      value={loginData.password}
                      onChange={(e)=>{setLoginData({...loginData , password: e.target.value})}}
                      required
                    />
                    <p className='mt-2 text-xs opacity-65'>Password must be at least 6 Characters long </p>
                  </div>

                  
                </div>

                <button className='btn btn-primary w-full min-h-12 rounded-xl' type='submit'>{isPending ? (<>
                <span className='loading loading-spinner loading-xs'></span>
                  Loading...
                </>): (
                  "Sign In "
                )}</button>
                <div className="text-center mt-2">
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <div className='text-center'>
                  <p className='text-sm '>
                    Don't have an account?{" "}
                    <Link to={"/signup"} className='text-primary hover:underline'>
                      Create One
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
              <img src={login} alt="language connection illustration" className='w-full h-full drop-shadow-2xl' />
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
