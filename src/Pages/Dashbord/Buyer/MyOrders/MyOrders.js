import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider/AuthProvider';

export default function MyOrders() {
  const {user} = useContext(AuthContext);

  const {data: orders=[],refetch, isLoading} = useQuery({
    queryKey:['orders'],
    queryFn: async ()=>{
      const res= await fetch(`http://localhost:5000/orders?email=${user?.email}`)
      const data = await res.json();
      return data;
    }
  })

  const handleDelete =(id)=>{
    const confirm = window.confirm('Are you want to delete? ');
    if(confirm)
     {
      fetch(`http://localhost:5000/orders/${id}`, {
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
      <h1 className='text-3xl text-primary uppercase text-left'>My orders</h1>
      <div className="divider"></div> 
    </div>
    <div>
    <div className="overflow-x-auto">
<table className="table w-full">
  <thead>
    <tr>
      <th>Serial</th>
      <th>Image</th>
      <th>order Name</th>
      <th>Price</th>
      <th>Action</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
   {
    orders&& orders?.map((order, i)=> <tr 
    key={order._id}
    className="hover">
    <td>{i+1}</td>
    <td><img src={order.image} alt="" className='w-3/4 rounded'/></td>
    <td>{order.productName}</td>
    <td>{order.price}</td>
    <td><Link to={`/dashbord/pay/${order._id}`}><button className='btn btn-success'>Pay</button></Link></td>
    <td><button onClick={()=>handleDelete(order._id)}  className='btn btn-error'>Delete</button></td>
  </tr>)
   }
  
    
  </tbody>
</table>
</div>
    </div>
  </div>
  )
}
