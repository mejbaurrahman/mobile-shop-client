import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navigation from '../../Components/Shared/Navigation/Navigation';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import useBuyer from '../../Hooks/useBuyer';
import useSeller from '../../Hooks/useSeller';

export default function DashboardLayout() {

  const {user} = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email)
  const [isSeller, isSellerLoading] = useSeller(user?.email)
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email)

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
   
      {
        isBuyer && !isAdmin && !isSeller && <>
        <li><Link to='/dashbord/myorders'>My Orders</Link></li>
        <li><Link to='/dashbord/wishlist'>My Wishlist</Link></li>
        </>
      }
      {
        
        isAdmin && !isBuyer && !isSeller && <>
        <li>
        <Link to='/dashbord/allbuyers'>All Buyers</Link>
      </li>
        <li>
        <Link to='/dashbord/allsellers'>All Sellers</Link>
      </li>
        <li>
        <Link to='/dashbord/allsellers'>Reported Items</Link>
      </li>
      </>
        }
        {
            isSeller && !isAdmin && !isBuyer && <>
            <li>
            <Link to='/dashbord/myproducts'>My Products</Link>
          </li>
            <li>
            <Link to='/dashbord/addproduct'>Add A Product</Link>
          </li>
            <li>
            <Link to='/dashbord/addproduct'>My Buyers</Link>
          </li>
          </>
        }
    </ul>
  
  </div>
</div>
    </div>
  )
}
