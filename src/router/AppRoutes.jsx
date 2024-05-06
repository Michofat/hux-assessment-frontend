import { Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import UserLogin from "../components/UserLogin";
//import DashboardHome from "../containers/DashboardHome";
//import UserLoggedOut from "../containers/UserLoggedOut";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userLogin" element={<UserLogin />} />
    </Routes>
  );
};

export default AppRoutes;
