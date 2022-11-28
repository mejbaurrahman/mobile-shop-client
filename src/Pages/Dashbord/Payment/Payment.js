import React from 'react'
import { useLoaderData } from 'react-router-dom'

export default function Payment() {
    const loader = useLoaderData();
  return (
    <div>
        <div>
            <h1 className='text-3xl font-thin'>Payment for <span className='text-primary'>{loader.productName}</span></h1>
            <div className="divider"></div>
        </div>
    </div>
  )
}
