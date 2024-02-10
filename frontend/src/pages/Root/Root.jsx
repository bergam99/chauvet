import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Root.css";
const Root = () => {
  return (
    <>
      <div className="Root">
        <Header />
        <main className="Root__Main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Root;
