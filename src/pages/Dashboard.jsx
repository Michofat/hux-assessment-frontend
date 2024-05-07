import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mui/material";
import { decodeTokenFromStorage } from "../utils/token";
import Header from "../components/Header";
import { checkedLoggedIn } from "../utils/checkLoggedIn";

const Dashboard = () => {
  const navigate = useNavigate();
  const userDetails = decodeTokenFromStorage();
  console.log("USERDETAILS", userDetails);
  useEffect(() => {
    checkedLoggedIn(userDetails, navigate);
  }, [navigate, userDetails]);

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedContact, setEditedContact] = useState(selectedContact || {});

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
    setEditedContact(contact); // Set editedContact state to the selected contact
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    console.log("CONTAAAAACT", editedContact);
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/contact/${selectedContact.contactId}`,
        {
          firstName: editedContact.firstName,
          lastName: editedContact.lastName,
          phoneNumber: editedContact.phoneNumber,
        }
      );
      closeModal();
      fetchContacts(); // Assuming fetchContacts function fetches the updated contact list
      alert("Contact updated successfully");
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Failed to update contact");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/contact/${selectedContact.contactId}`
      );
      closeModal();
      fetchContacts(); // Assuming fetchContacts function fetches the updated contact list
      alert("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact");
    }
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
      <Header />
      {/* Main Content */}
      <div className="flex">
        <SideBar />

        {/* Main Page */}
        <main className="w-10/12 p-4">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome <span className="text-blue-500">{userDetails?.email}</span>
          </h2>

          <h3 className="text-lg font-semibold mb-4 text-gray-600 text-center">
            All Contacts
          </h3>
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
                    <button onClick={() => handleDelete(contact)}>
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
        {/* Modal Content */}
        <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 id="edit-modal-title" className="text-xl font-bold mb-4">
            Edit Contact
          </h2>
          <form onSubmit={handleUpdate}>
            {/* First Name */}
            <div className="mb-4 flex flex-col">
              <label htmlFor="firstName" className="mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={editedContact.firstName || ""}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-3 py-2 mb-2"
              />
            </div>
            {/* Last Name */}
            <div className="mb-4 flex flex-col">
              <label htmlFor="lastName" className="mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={editedContact.lastName || ""}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-3 py-2 mb-2"
              />
            </div>
            {/* Phone Number */}
            <div className="mb-4 flex flex-col">
              <label htmlFor="phoneNumber" className="mb-1">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={editedContact.phoneNumber || ""}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-3 py-2 mb-2"
              />
            </div>
            {/* Update Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Update
              </button>
              {/* Cancel Button */}
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
      {/* Delete Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={closeModal}
        aria-labelledby="delete-modal-title"
      >
        <div className="modal-content p-8 rounded-lg shadow-lg bg-white z-50">
          <h2 id="delete-modal-title" className="text-xl font-bold mb-4">
            Delete Contact
          </h2>
          <p>Are you sure to delete {selectedContact?.firstName}?</p>
          {/* Delete Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
            {/* Cancel Button */}
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ml-4"
            >
              Cancel
            </button>
          </div>
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
