import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ModalPostForm from "../modal/ModalPostForm";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Root() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      {user.token !== "" && <ModalPostForm />}
    </>
  );
}
