import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../components/layout";
import Home from "../components/home/home";
import Product from "../components/Product/productList";
import ProductDetails from "../components/Product/productDetails";
import AddProduct from "../components/Product/addProduct";
import EditProduct from "../components/Product/editProduct";
import DeleteProduct from "../components/Product/deleteProduct";
import Cart from "../components/Cart/Cart";
import Signup from "../components/Signup/Signup";
import Login from "../components/Login/Login";
import Profile from "../components/Profile/profile";
import axios from 'axios';
import {useState } from "react";

const Routes = () => {
    const {token, userRole, profileUserName} = useAuth();
    const [cartAmount, setCartAmount] = useState(0)

    const getCartAmount = () => {
        axios.get('https://localhost:7277/Cart/Amount', {params: {userName: profileUserName}})
            .then(response => {
                setCartAmount(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/Product",
            element: <Product/>,
        },
        {
            path: "/Product/:productID",
            element: <ProductDetails getCartAmount={getCartAmount} />,
        },
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute/>,
            children: [
                {
                    path: "/Cart",
                    loader: () => (userRole === "User" ? null : redirect("/")),
                    element: <Cart getCartAmount={getCartAmount} />,
                },
                {
                    path: "/Profile",
                    element: <Profile/>,
                },
                {
                    path: "/AddProduct",
                    loader: () => (userRole === "Admin" ? null : redirect("/")),
                    element: <AddProduct/>,
                },
                {
                    path: "/EditProduct/:productId",
                    loader: () => (userRole === "Admin" ? null : redirect("/")),
                    element: <EditProduct/>,
                },
                {
                    path: "/DeleteProduct/:productId",
                    loader: () => (userRole === "Admin" ? null : redirect("/")),
                    element: <DeleteProduct/>,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/Signup",
            element: <Signup/>
        },
        {
            path: "/Login",
            element: <Login/>
        },
    ];

    // Combine and conditionally include routes based on authentication 
    const router = createBrowserRouter([
        {
            element: <Layout cartAmount={cartAmount} getCartAmount={getCartAmount} />,
            children: [
                ...routesForPublic,
                ...(!token ? routesForNotAuthenticatedOnly : []),
                ...routesForAuthenticatedOnly,
            ]
        },
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;