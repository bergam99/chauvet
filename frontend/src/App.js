import "./App.css";
import Auth from "./pages/Auth/Auth";
import Error from "./pages/Error/Error";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Root from "./pages/Root/Root";
import Shop from "./pages/Shop/Shop";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Shop /> },
      { path: "/admin/dashboard", element: <Shop /> },
      { path: "/me/orders", element: <Shop /> },
      { path: "/me/profile", element: <Profile /> },
      { path: "/cart", element: <Shop /> },
      { path: "/login", element: <Auth /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/register", element: <Register /> },
      { path: "/password/forgot", element: <ForgotPassword /> },
      { path: "/password/reset/:token", element: <ResetPassword /> },

      // { path: "/me/update_password", element: <UpdatePassword /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
