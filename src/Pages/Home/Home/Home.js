import React from 'react'
import CategorySelection from '../../../Components/CategorySelection/CategorySelection'
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems'
import Banner from '../Banner/Banner'
import Testimonial from '../Tesitmonial/Testimonial'

export default function Home() {
  return (
    <div className='w-full mx-auto'>
      <Banner></Banner>
      <AdvertiseItems></AdvertiseItems>
      <CategorySelection></CategorySelection>
      <Testimonial></Testimonial>
    </div>
  )
}
