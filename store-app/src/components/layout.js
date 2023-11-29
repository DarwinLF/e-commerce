import { Outlet} from "react-router-dom";
import { Navbar, Typography} from "@material-tailwind/react";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
          <Navbar 
            className="flex justify-between sticky top-0 z-10 mx-auto w-screen bg-zinc-900 px-4 py-2"
          >
            <div className="flex">
              <div className="text-white ml-7">
                <Typography
                  as="a"
                  href="/"
                  className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                  Home
                </Typography>
              </div>
              <div className="text-white ml-7">
                <Typography
                  as="a"
                  href="/Product"
                  className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                  Products
                </Typography>
              </div>
              <div className="text-white ml-7">
                <Typography
                  as="a"
                  href="/Cart"
                  className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                  Cart
                </Typography>
              </div>
            </div>
            <div className="text-white ml-7">
              <Typography
                as="a"
                href="/Login"
                className="mr-4 cursor-pointer py-1.5 font-medium"
              >
                Login
              </Typography>
            </div>
          </Navbar>

          <Outlet />
        </div>
    )
}

export default Layout;