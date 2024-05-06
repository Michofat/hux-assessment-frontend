import { Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import UserLogin from "../components/UserLogin";
import Dashboard from "../pages/Dashboard";
//import UserLoggedOut from "../containers/UserLoggedOut";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userLogin" element={<UserLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
