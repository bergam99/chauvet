import React from "react";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = () => {
  const menuItems = [
    {
      name: "Mon Profile",
      url: "/me/profile",
    },
    // {
    //   name: "Modifier le mot de passe",
    //   url: "/me/update_password",
    // },
  ];

  return (
    <>
      <ul className="SideMenu__nav">
        {menuItems?.map((menuItem, index) => (
          <li key={index}>
            <NavLink
              to={menuItem.url}
              className={({ isActive }) =>
                isActive ? "SideMenu__active" : undefined
              }
            >
              {/* {menuItem.name} */}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SideMenu;
