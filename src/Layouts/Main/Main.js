import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Shared/Footer/Footer'
import Navigation from '../../Components/Shared/Navigation/Navigation'

export default function Main() {
  return (
    <div className=''>
        <div className='lg:max-w-[1140px] mx-auto'>
        <Navigation className='md:container mx-auto md:ml-6'></Navigation>
        <Outlet className='w-full mx-auto'></Outlet></div>
        <Footer></Footer>
    </div>
  )
}
