import "./App.css";
import Error from "./pages/Error/Error";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
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
      { path: "/login", element: <Shop /> },
      { path: "/product/:id", element: <ProductDetails /> },
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
