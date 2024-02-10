import React from "react";
import logo from "../../../src/assets/imgs/logo/logo.png";
import cart from "../../../src/assets/icons/cart.png";
import user from "../../../src/assets/icons/user.png";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
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
            <img className="Header__user" src={user} alt="user" />
          </NavLink>
        </li>
      </ul>

      {/* dropdown */}
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
            <NavLink to="/me/orders">Commandes</NavLink>
          </li>
          <li>
            <NavLink to="/me/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
