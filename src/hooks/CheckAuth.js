import { useEffect } from "react";
import { decodeTokenFromStorage } from "../utils/token";

const CheckAuth = ({ children, navigate }) => {
  useEffect(() => {
    const userDetails = decodeTokenFromStorage();
    if (!userDetails) {
      navigate("/home");
    }
  }, [navigate]);

  return children;
};

export default CheckAuth;
