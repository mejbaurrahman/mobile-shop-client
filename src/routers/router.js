import DashboardLayout from "../Layouts/DashbordLayout/DashbordLayout";
import Main from "../Layouts/Main/Main";
import AddProduct from "../Pages/Dashbord/AddProduct/AddProduct";
import AllBuyers from "../Pages/Dashbord/AllBuyers/AllBuyers";
import MyProducts from "../Pages/Dashbord/MyProducts/MyProducts";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";

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
            }
        ]
    },
    {
        path:'/dashbord',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'/dashbord',
                element:<MyProducts></MyProducts>
            },
            {
                path:'/dashbord/allbuyers',
                element:<AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            }
            ,
            {
                path:'/dashbord/addproducts',
                element:<SellerRoute><AddProduct></AddProduct></SellerRoute>
            }
        ]}
])

