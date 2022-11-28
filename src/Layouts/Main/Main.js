import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Shared/Footer/Footer'
import Navigation from '../../Components/Shared/Navigation/Navigation'

export default function Main() {
  return (
    <div className='lg:container lg:max-w-[1180px] mx-auto'>
        <Navigation></Navigation>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
