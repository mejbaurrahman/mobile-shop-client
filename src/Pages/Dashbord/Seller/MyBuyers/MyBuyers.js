import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider'

export default function MyBuyers() {
  const {user } = useContext(AuthContext);
  const [buyers, setBuyers] = useState([])

  useEffect(()=>{
    fetch(`https://mobileshop-inky.vercel.app/mybuyers?email=${user?.email}`,{
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
    }
    })
    .then(res=>res.json())
    .then(data=>{
      setBuyers(data)
      console.log(data)
    })
  },[user?.email])

  return (
    <div>
    <div>
      <h1 className='text-3xl text-primary uppercase text-left'>My Buyers</h1>
      <div className="divider"></div> 
    </div>
    <div>
    <div className="overflow-x-auto">
<table className="table w-full">
  <thead>
    <tr>
      <th>Serial</th>
      <th>Buyer Name</th>
      <th>Buyer Email</th>
      <th>Product</th>
      <th>Price</th>
      <th>Tranaction ID</th>
    </tr>
  </thead>
  <tbody>
   {
    buyers&& buyers?.map((order, i)=> <tr 
    key={order._id}
    className="hover">
    <td>{i+1}</td>
    <td>{order?.buyerName}</td>
    <td>{order?.buyerEmail}</td>
    <td>{order?.productName}</td>
    <td>{order?.price}</td>
    <td>{order?.transactionId}</td>
  </tr>)
   }
  
    
  </tbody>
</table>
</div>
    </div>
  </div>
  )
}
