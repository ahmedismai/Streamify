import React from 'react'
import Sidebar from './../Sidebar/Sidebar.jsx';
import Navbar from '../Navbar/Navbar.jsx';

export default function Layout({ children,showSidebar=false}) {
  return (
    <div className='min-h-screen'>
        <div className='flex min-h-screen'>
            {showSidebar && <Sidebar/>}
            <div className='flex-1 flex flex-col min-w-0'>
                <Navbar/>
                <main className='flex-1 overflow-y-auto'>
                    {children}
                </main>
            </div>
        </div>
    </div>
  )
}
