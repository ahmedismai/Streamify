  import React from 'react';
  import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Signup from './Components/Signup/Signup.jsx';
import Login from './Components/Login/Login.jsx';
import Call from './Components/Call/Call';
import Notifications from './Components/Notifications/Notifications.jsx';
import Onboarding from './Components/Onboarding/Onboarding.jsx';
import { Toaster } from 'react-hot-toast';
import PageLoader from './Components/PageLoader/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './Components/Layout/Layout.jsx';
import { useThemeStore } from './hooks/useThemeStore';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ChatPage from './Components/Chat/Chat.jsx';
import Friends from './Components/Friends/Friends';

function App() {
  
  const {isLoading , authUser}=useAuthUser()
  const isAuthenticated = Boolean(authUser)
  const isOnBoarded = authUser?.isOnBoarded 
  const {theme}=useThemeStore()

  if (isLoading) {
    return <PageLoader/>
  }

  return ( <>
    
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnBoarded ? (<Layout showSidebar={true}><Home/></Layout>) : <Navigate to={!isAuthenticated ? "/login" :"/onboarding"}/> }/>
        <Route path='/signup' element={!isAuthenticated ? <Signup/> : <Navigate to={isOnBoarded ? "/" : "/onboarding"}/>}/>
        <Route path='/login' element={!isAuthenticated ? <Login/> : <Navigate to={isOnBoarded ? "/" : "/onboarding"}/>}/>
        <Route path='/chat/:id' element={isAuthenticated && isOnBoarded? <Layout showSidebar={false}><ChatPage/></Layout>  : <Navigate to={!isAuthenticated ? "/login" :"/onboarding"} />}/>
        <Route path='/forgot-password' element={!isAuthenticated ? <ForgotPassword/> : <Navigate to="/" />}/>
        <Route path='/reset-password/:token' element={!isAuthenticated ? <ResetPassword/> : <Navigate to="/" />}/>
        <Route path='/call/:id' element={isAuthenticated && isOnBoarded? <Layout><Call/></Layout> : <Navigate to={!isAuthenticated ? "/login" :"/onboarding"} />}/>
        <Route path='/notifications' element={isAuthenticated && isOnBoarded ?<Layout showSidebar={true}><Notifications/></Layout> : <Navigate to={!isAuthenticated ? "/login" :"/onboarding"}/> }/>
        <Route path='/friends' element={isAuthenticated && isOnBoarded ?<Layout showSidebar={true}><Friends/></Layout> : <Navigate to={!isAuthenticated ? "/login" :"/onboarding"}/> }/>
        <Route path='/onboarding' element={isAuthenticated ? (!isOnBoarded ? (<Onboarding/>) : (<Navigate to="/"/>)) : <Navigate to="/login" />}/>
      </Routes>
      <Toaster/>
    </div>
  
  </>

  )
}

export default App
