import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';


export default function AdminRoute({children}) {

    const {user, loading} = useContext(AuthContext);
    const location= useLocation();
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    if(loading || isAdminLoading){
        return <div className='flex justify-center mt-10'>
         <progress className="progress w-56"></progress>
        </div>
     }
    if(user&&isAdmin){
        return children;
    }
   
  return <Navigate to='/login' state={{from:location}} replace></Navigate>
}