import "./App.css";
import Auth from "./pages/Auth/Auth";
import Cart from "./pages/Cart/Cart";
import ConfirmOrder from "./pages/ConfirmOrder/ConfirmOrder";
import Error from "./pages/Error/Error";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Root from "./pages/Root/Root";
import Shipping from "./pages/Shipping/Shipping";
import Shop from "./pages/Shop/Shop";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      { path: "/cart", element: <Cart /> },
      { path: "/shipping", element: <Shipping /> },
      { path: "/login", element: <Auth /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/register", element: <Register /> },
      { path: "/password/forgot", element: <ForgotPassword /> },
      { path: "/password/reset/:token", element: <ResetPassword /> },
      { path: "/confirm_order", element: <ConfirmOrder /> },
      { path: "/payment_method", element: <PaymentMethod /> },
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
