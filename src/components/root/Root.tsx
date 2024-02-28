import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ModalPostForm from "../modal/ModalPostForm";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer } from "react-toastify";

export default function Root() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
      {user.token !== "" && <ModalPostForm />}
    </>
  );
}
