// import React, { useState } from "react";
import AppRoutes from "./router/AppRoutes";
import { BrowserRouter } from "react-router-dom";
// import AddContactForm from "./pages/AddContactForm";
//import ContactList from "./pages/ContactList";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
