import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, Link} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import axios from 'axios';

const Layout = (props) => {
    const {profileUserName, userRole} = useAuth();
    const [openedDrawer, setOpenedDrawer] = useState(false)
    //const [cartAmount, setCartAmount] = useState(0)

    function toggleDrawer() {
      setOpenedDrawer(!openedDrawer);
    }

    function changeNav(event) {
      if (openedDrawer) {
        setOpenedDrawer(false)
      }
    }

    useEffect(() => {
      if(userRole === "User") {
        props.getCartAmount();
      }
    }, []);

    return (
        <>
          <header>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/" onClick={changeNav}>
                  <FontAwesomeIcon
                    icon={["fab", "bootstrap"]}
                    className="ms-1"
                    size="lg"
                  />
                  <span className="ms-2 h5">Shop</span>
                </Link>

                <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
                  <ul className="navbar-nav me-auto mb-lg-0">
                    <li className="nav-item">
                      <Link to="/Product" className="nav-link" replace onClick={changeNav}>
                        Explore
                      </Link>
                    </li>
                  </ul>
                  {userRole === "User"?
                    <Link to="/Cart" onClick={changeNav}>
                      <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline">
                        <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                        <span className="ms-3 badge rounded-pill bg-dark">{props.cartAmount}</span>
                      </button>
                    </Link>
                  : <></>}
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                      <a
                        href="!#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        id="userDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon icon={["fas", "user-alt"]} />
                        {profileUserName ?
                          <span className="ms-2 h5">{profileUserName}</span>
                        : <></>}
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="userDropdown"
                      >
                        {profileUserName ?
                          <li>
                            <LogoutButton/>
                          </li>
                        : 
                        <>
                          <li>
                            <Link to="/Login" className="dropdown-item" onClick={changeNav}>
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link to="/Signup" className="dropdown-item" onClick={changeNav}>
                              Sign Up
                            </Link>
                          </li>
                        </>
                        }
                        
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="d-inline-block d-lg-none">
                  <button type="button" className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                    <span className="ms-3 badge rounded-pill bg-dark">0</span>
                  </button>
                  <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-shrink-0 bg-light">
              <Outlet getCartAmount={props.getCartAmount}/>
          </main>

          <footer className="mt-auto py-5 bg-dark">
            <div className="container d-flex justify-content-center">
              <span className="text-muted">Copyright &copy; Website 2024</span>
            </div>
          </footer>
        </>
    );
}

export default Layout;