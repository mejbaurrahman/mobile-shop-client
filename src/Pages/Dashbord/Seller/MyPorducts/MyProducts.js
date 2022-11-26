import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider';

export default function MyProducts() {

  const {user} = useContext(AuthContext);

  const {data: products=[],refetch, isLoading} = useQuery({
    queryKey:['products'],
    queryFn: async ()=>{
      const res= await fetch(`http://localhost:5000/products?email=${user?.email}`)
      const data = await res.json();
      return data;
    }
  })

 const handleAdvertise =(product, id)=>{
      fetch(`http://localhost:5000/products/${id}`,{
        method:'PATCH',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({status:'advertised'})
      }).then(res=>res.json())
      .then(updateData =>{
        if(updateData.modifiedCount){
          toast.success(`${product} added in advertise List`)
          refetch();
        }
      })
 }
 const handleDelete =(id)=>{
  const confirm = window.confirm('Are you want to delete? ');
  if(confirm)
   {
    fetch(`http://localhost:5000/products/${id}`, {
              method: 'DELETE',
              headers: {
                  'content-type':'application/json',
                  authorization: `bearer ${localStorage.getItem('accessToken')}`
              }
          })
              .then(res => res.json())
              .then(data => {
                  if (data.deletedCount > 0) {
                      toast.success('Successfully Deleted!')
                      refetch();
                  }
              })
   }
   
 }
  return (
    <div>
      <div>
        <h1 className='text-3xl text-primary uppercase text-left'>My Products</h1>
        <div className="divider"></div> 
      </div>
      <div>
      <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th>Serial</th>
        <th>Image</th>
        <th>Product Name</th>
        <th>Posted time</th>
        <th>Status</th>
        <th>Advertise</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     {
      products&& products?.map((product, i)=> <tr 
      key={product._id}
      className="hover">
      <td>{i+1}</td>
      <td><img src={product.image} alt="" className='w-3/4 rounded-full'/></td>
      <td>{product.productName}</td>
      <td>{product.postedTime}</td>
      <td>{product?.status === 'sold'? 'Sold': 'Available'}</td>
      <td><button onClick={()=>handleAdvertise(product.productName, product._id)} className='btn btn-primary' disabled={product?.status}>{product?.status? product?.status : 'Advertise'}</button></td>
      <td><button onClick={()=>handleDelete(product._id)}  className='btn btn-error'>Delete</button></td>
    </tr>)
     }
    
      
    </tbody>
  </table>
</div>
      </div>
    </div>
  )
}
