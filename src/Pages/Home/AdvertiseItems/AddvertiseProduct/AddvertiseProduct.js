import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function AddvertiseProduct({addvertisedProduct}) {
//   const [categoryId, setCategoryId] = useState('');
  
  const {productName, image, resalePrice, orginalPrice, category, _id } = addvertisedProduct;
  return (
    <div className=''>
        <div className="card w-full glass p-4">
  <figure><img src={image} className='w-1/2'/></figure>
  <div className="card-body">
    <h2 className="card-title">{productName}</h2>
    <div>
        <h1>Price: {resalePrice}Tk</h1>
        <h1>Orginal Price: {orginalPrice}Tk</h1>
    </div>
    <div className="card-actions justify-end">
      <Link to={`/product/${addvertisedProduct._id}`}><button className="btn btn-primary">Check Details</button></Link>
    </div>
  </div>
</div>
    </div>
  )
}
