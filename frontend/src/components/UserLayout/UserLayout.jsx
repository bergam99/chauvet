import React from "react";
import SideMenu from "../SideMenu/SideMenu";

const UserLayout = ({ children }) => {
  return (
    <>
      <h1>User</h1>
      <SideMenu />
      <div>{children}</div>
    </>
  );
};

export default UserLayout;
