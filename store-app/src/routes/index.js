import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../components/layout";
import Home from "../components/home";
import Product from "../components/Product/product";
import Cart from "../components/Cart/Cart";
import Signup from "../components/Signup/Signup";
import Login from "../components/Login/Login";

const Routes = () => {
    const {token} = useAuth();

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
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/Cart",
            element: <ProtectedRoute/>,
            children: [
                {
                    path: "/Cart",
                    element: <Cart/>,
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
            element: <Layout/>,
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