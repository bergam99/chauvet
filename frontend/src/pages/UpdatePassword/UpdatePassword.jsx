// import { useEffect, useState } from "react";
// import { useUpdatePasswordMutation } from "../../redux/api/userApi";
// import { useNavigate } from "react-router-dom";
// import UserLayout from "../../components/UserLayout/UserLayout";

// const UpdatePassword = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const [updatePassword, { isLoading, error, isSuccess }] =
//     useUpdatePasswordMutation();

//   console.log({ error });
//   console.log({ isSuccess });

//   useEffect(() => {
//     if (isSuccess) {
//       navigate("/me/profile");
//     }
//   }, [isSuccess]);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const userData = {
//       oldPassword,
//       password,
//     };

//     updatePassword(userData);
//   };

//   return (
//     <UserLayout>
//       <form onSubmit={submitHandler}>
//         <h2>Changer mon mot de passe</h2>
//         <div>
//           <input
//             type="password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             placeholder="Mot de passe actuel *"
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Nouveau mot de passe *"
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Loading..." : "Enregistrer"}
//         </button>
//         {error && error.data.message}
//         {isSuccess && "Password Updated"}

//         <p>* sont obligatoire.</p>
//       </form>
//     </UserLayout>
//   );
// };

// export default UpdatePassword;
