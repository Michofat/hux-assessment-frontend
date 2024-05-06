import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
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

        {/* Main Page */}
        <main className="w-10/12 p-4">
          <h2 className="text-2xl font-semibold mb-4">All Contacts</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border border-gray-300 text-left">
                  First Name
                </th>
                <th className="py-2 px-4 border border-gray-300 text-left">
                  Last Name
                </th>
                <th className="py-2 px-4 border border-gray-300 text-left">
                  Phone Number
                </th>
                <th className="py-2 px-4 border border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border border-gray-300">
                    {contact.firstName}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {contact.lastName}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {contact.phoneNumber}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <button className="mr-2" onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

function logout() {
  // Implement your logout logic here
  alert("Logout button clicked");
}

export default Dashboard;
