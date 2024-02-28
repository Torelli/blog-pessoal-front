import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomIcon from "../components/icon/CustomIcon";

export function toasts(message: string, type: string) {
  switch (type) {
    case "success":
      toast(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        progressStyle: {
          background:
            "linear-gradient(to right, rgba(192, 38, 211, 1), rgba(59, 130, 246, 1))",
        },
        icon:CustomIcon
      });
      break;

    case "info":
      toast.info(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      break;

    case "error":
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      break;

    default:
      toast(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      break;
  }
}
