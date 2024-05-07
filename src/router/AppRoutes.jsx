import { Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import UserLogin from "../pages/UserLogin";
import Dashboard from "../pages/Dashboard";
//import NewContact from "../pages/NewContact";
import AddContact from "../pages/AddContact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userLogin" element={<UserLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addcontact" element={<AddContact />} />
    </Routes>
  );
};

export default AppRoutes;
