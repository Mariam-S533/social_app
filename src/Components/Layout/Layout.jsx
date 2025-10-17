import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';

function Layout() {

  return (
    <>
    <div className='flex flex-col min-h-screen justify-between'>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
    </>
  )
}

export default Layout