import DashboardLayout from "../Layouts/DashbordLayout/DashbordLayout";
import Main from "../Layouts/Main/Main";
import Dashbord from "../Pages/Dashbord/Dashbord/Dashbord";
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
                element:<Dashbord></Dashbord>
            },
            {
                path:'/dashbord/myorders',
                element:<Dashbord></Dashbord>
            },
            {
                path:'/dashbord/wishlist',
                element:<Dashbord></Dashbord>
            },
          
            
        ]}
])

