import "./App.css";
import Auth from "./pages/Auth/Auth";
import Error from "./pages/Error/Error";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Register from "./pages/Register/Register";
import Root from "./pages/Root/Root";
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
      { path: "/me/profile", element: <Shop /> },
      { path: "/cart", element: <Shop /> },
      { path: "/login", element: <Auth /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/register", element: <Register /> },
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
