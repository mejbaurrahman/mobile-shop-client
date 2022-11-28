import React from 'react'
import CategorySelection from '../../../Components/CategorySelection/CategorySelection'
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems'
import Banner from '../Banner/Banner'

export default function Home() {
  return (
    <div className='md:container mx-auto'>
      <Banner></Banner>
      <AdvertiseItems></AdvertiseItems>
      <CategorySelection></CategorySelection>
    </div>
  )
}
