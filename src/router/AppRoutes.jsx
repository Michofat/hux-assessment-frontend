import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import UserLogin from "../pages/UserLogin";
import Dashboard from "../pages/Dashboard";
import AddContact from "../pages/AddContact";
import Logout from "../components/Logout";
import SignUp from "../pages/SignUp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userLogin" element={<UserLogin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addcontact" element={<AddContact />} />
    </Routes>
  );
};

export default AppRoutes;
