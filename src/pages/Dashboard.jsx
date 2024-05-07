import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Button } from "@mui/material";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleDelete = (contactId) => {
    setSelectedContact(contactId);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setSelectedContact(null);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    fetchContacts();
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
                    <button
                      className="mr-2"
                      onClick={() => handleEdit(contact)}
                    >
                      <EditIcon />
                    </button>
                    <button onClick={() => handleDelete(contact.contactId)}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={closeModal}
        aria-labelledby="edit-modal-title"
        className="flex justify-center items-center"
      >
        <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 id="edit-modal-title" className="text-xl font-bold mb-4">
            Edit Contact
          </h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4 flex flex-col">
              <label htmlFor="firstName" className="mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={selectedContact?.firstName || ""}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-3 py-2 mb-2"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="lastName" className="mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={selectedContact?.lastName || ""}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-3 py-2 mb-2"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="phoneNumber" className="mb-1">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={selectedContact?.phoneNumber || ""}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-3 py-2 mb-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Update
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={closeModal}
        aria-labelledby="delete-modal-title"
      >
        <div className="modal-content">
          <h2 id="delete-modal-title">Delete Contact</h2>
          {/* Place your delete modal content here */}
          <Button onClick={closeModal}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

function logout() {
  // Implement your logout logic here
  alert("Logout button clicked");
}

export default Dashboard;
