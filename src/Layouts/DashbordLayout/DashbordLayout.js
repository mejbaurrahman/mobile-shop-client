import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navigation from '../../Components/Shared/Navigation/Navigation';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import useSeller from '../../Hooks/useSeller';

export default function DashboardLayout() {

  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)
  const [isSeller] = useSeller(user?.email)

  console.log(isSeller)
  return (
    <div>
        <Navigation></Navigation>
        
        <div className="drawer drawer-mobile">
  <input id="dashbord-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
   <Outlet></Outlet>  
  </div> 
  <div className="drawer-side">
    <label htmlFor="dashbord-drawer" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
   
      <li><Link to='/dashbord'>All Products</Link></li>
      {
        
        isAdmin && <>
        <li>
        <Link to='/dashbord/allbuyers'>All Buyers</Link>
      </li>
        <li>
        <Link to='/dashbord/allsellers'>All Sellers</Link>
      </li>
      </>
        }
        {
            isSeller && !isAdmin && <>
            <li>
            <Link to='/dashbord/myproducts'>My Products</Link>
          </li>
            <li>
            <Link to='/dashbord/productadd'>Product Add</Link>
          </li>
          </>
        }
    </ul>
  
  </div>
</div>
    </div>
  )
}
