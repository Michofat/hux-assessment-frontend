import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/token";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    clearToken();
    navigate("/");
  }, [navigate]);

  return null; // You can return null as Logout is a redirect component
}

export default Logout;
