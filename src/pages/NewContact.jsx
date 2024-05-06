import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import ContactForm from "../components/ContactForm";
import axios from "axios";

const NewContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/contacts");
      const result = response.data.result;
      setContacts(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (contact) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/contact/${contact.contactId}`,
        contact
      );
      fetchContacts(); // Refetch contacts after update
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/contact/${contactId}`
      );
      fetchContacts(); // Refetch contacts after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* App Header */}
      <header className="bg-blue-500 py-4 px-8 flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
        <button className="text-white font-semibold" onClick={logout}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="flex">
        <SideBar />

        <ContactForm />
      </div>
    </div>
  );
};

function logout() {
  // Implement your logout logic here
  alert("Logout button clicked");
}

export default NewContact;
