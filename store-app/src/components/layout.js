import { Outlet} from "react-router-dom";
import { Navbar, Typography} from "@material-tailwind/react";
import { useAuth } from "../provider/authProvider";
import LogoutButton from "./LogoutButton";

const Layout = () => {
    const {profileUserName, userRole} = useAuth();

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
              {userRole === "User"? 
                <div className="text-white ml-7">
                  <Typography
                    as="a"
                    href="/Cart"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                  >
                    Cart
                  </Typography>
                </div>
              : <></>}
              
            </div>
            {!profileUserName ? 
              <div className="text-white ml-7">
                <Typography
                  as="a"
                  href="/Login"
                  className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                  Login
                </Typography>
              </div>
            : <div className="flex">
                <Typography
                  as="a"
                  href="/Profile"
                  className="mr-2 cursor-pointer font-medium"
                >
                  {profileUserName}
                </Typography>
                
                <LogoutButton/>
              </div>
            }
          </Navbar>

          <header className="App-header bg-zinc-700">
            <Outlet />
          </header>
        </div>
    )
}

export default Layout;