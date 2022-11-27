import React from 'react'
import CategorySelection from '../../../Components/CategorySelection/CategorySelection'
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems'

export default function Home() {
  return (
    <div className='md:container mx-auto'>
      <AdvertiseItems></AdvertiseItems>
      <CategorySelection></CategorySelection>
    </div>
  )
}
