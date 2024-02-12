import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Root.css";
const Root = () => {
  return (
    <>
      <section className="Root">
        <Header />
        <main className="Root__Main">
          <Outlet />
        </main>
        <Footer />
      </section>
    </>
  );
};

export default Root;
