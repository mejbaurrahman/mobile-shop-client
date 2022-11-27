import DashboardLayout from "../Layouts/DashbordLayout/DashbordLayout";
import Main from "../Layouts/Main/Main";
import Dashbord from "../Pages/Dashbord/Dashbord/Dashbord";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import MyOrders from "../Pages/Dashbord/Buyer/MyOrders/MyOrders";
import MyWishList from "../Pages/Dashbord/Buyer/MyWishList/MyWishList";
import AllSeller from "../Pages/Dashbord/Admin/AllSeller/AllSeller";
import AllBuyers from "../Pages/Dashbord/Admin/AllBuyers/AllBuyers";
import ReportedItems from "../Pages/Dashbord/Admin/ReportedItems/ReportedItems";
import MyProducts from "../Pages/Dashbord/Seller/MyPorducts/MyProducts";
import AddAProduct from "../Pages/Dashbord/Seller/AddAProduct/AddAProduct";
import MyBuyers from "../Pages/Dashbord/Seller/MyBuyers/MyBuyers";
import CategoryAdd from "../Pages/Dashbord/Admin/CategoryAdd/CategoryAdd";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/product/:id',
                loader:({params})=>fetch(`http://localhost:5000/product/${params.id}`),
                element:<ProductDetail></ProductDetail>
            },

        ]
    },
    {
        path:'/dashbord',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'/dashbord',
                element:<Dashbord></Dashbord>
            },
            {
                path:'/dashbord/myorders',
                element:<BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path:'/dashbord/wishlist',
                element:<BuyerRoute><MyWishList></MyWishList></BuyerRoute>
            },
            {
                path:'/dashbord/allseller',
                element:<AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path:'/dashbord/allbuyers',
                element:<AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path:'/dashbord/reporteditems',
                element:<AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path:'/dashbord/categoryadd',
                element:<AdminRoute><CategoryAdd></CategoryAdd></AdminRoute>
            },
            {
                path:'/dashbord/myproducts',
                element:<SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
          
            {
                path:'/dashbord/addproduct',
                element:<SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
          
            {
                path:'/dashbord/mybuyers',
                element:<SellerRoute><MyBuyers></MyBuyers></SellerRoute>
            },
          
            
        ]}
])

