import { toast } from "react-toastify";

export const SCREEN_BREAKPOINTS = {
    xs: "480px",
    s: "768px",
    md: "1024px",
    lg: "1200px",
};

export const SERVER_URL = "http://localhost:5000";

export const TOAST_PROPERTIES = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};
