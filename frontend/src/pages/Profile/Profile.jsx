import React from "react";
import UserLayout from "../../components/UserLayout/UserLayout";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <UserLayout>
      <h2>Profile</h2>
      <h4>nom : </h4>
      <p>{user?.name}</p>
      <h4>email : </h4>
      <p>{user?.email}</p>
      <h4>isnscrit le : </h4>
      <p>{user?.createdAt?.substring(0, 10)}</p>
    </UserLayout>
  );
};

export default Profile;
