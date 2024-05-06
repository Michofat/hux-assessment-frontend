import { Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import UserLogin from "../components/UserLogin";
import Dashboard from "../pages/Dashboard";
import NewContact from "../pages/NewContact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userLogin" element={<UserLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/newContact" element={<NewContact />} />
    </Routes>
  );
};

export default AppRoutes;
