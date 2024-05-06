import { Route, Routes } from "react-router-dom";

import Home from "../components/Home";
//import UserLogin from "../containers/UserLogin";
//import DashboardHome from "../containers/DashboardHome";
//import UserLoggedOut from "../containers/UserLoggedOut";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
