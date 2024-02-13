import React from "react";
import logo from "../../../src/assets/imgs/logo/logo.png";
import cart from "../../../src/assets/icons/cart.png";
import userIcon from "../../../src/assets/icons/user.png";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { useLazyLogoutQuery } from "../../redux/api/authApi";

const Header = () => {
  const { isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [logout, { data }] = useLazyLogoutQuery();

  // console.log("logout => ", data);

  const logoutHandler = () => {
    logout();
    navigate(0); // refresh page
  };

  return (
    <header>
      <ul className="Header">
        <li>
          <NavLink to="/" end>
            <img className="Header__logo" src={logo} alt="logo" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart">
            <img className="Header__cart" src={cart} alt="cart" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <img className="Header__user" src={userIcon} alt="user" />
          </NavLink>
          <p>{user?.name}</p>
        </li>
      </ul>

      {user ? (
        <nav>
          <ul className="Header__nav">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive ? "Header__active" : undefined
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/me/orders"
                className={({ isActive }) =>
                  isActive ? "Header__active" : undefined
                }
              >
                Commandes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/me/profile"
                className={({ isActive }) =>
                  isActive ? "Header__active" : undefined
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "Header__active" : undefined
                }
                onClick={logoutHandler}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        !isLoading && <Link to="/login">Me connecter</Link>
      )}
    </header>
  );
};

export default Header;
