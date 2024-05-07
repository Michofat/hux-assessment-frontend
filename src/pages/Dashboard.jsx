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
import { CircularProgress } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const userDetails = decodeTokenFromStorage();

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
      alert("Error fetching contacts");
    }
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setEditedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/contact/${selectedContact.contactId}`,
        {
          firstName: editedContact.firstName,
          lastName: editedContact.lastName,
          phoneNumber: editedContact.phoneNumber,
        }
      );
      closeModal();
      fetchContacts();
      alert("Contact updated successfully");
    } catch (error) {
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
      fetchContacts();
      alert("Contact deleted successfully");
    } catch (error) {
      alert("Failed to delete contact");
    }
  };

  const closeModal = () => {
    setSelectedContact(null);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    fetchContacts();
  };

  const handleDetails = (contactId) => {
    navigate(`/contactdetails/${contactId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex">
        <SideBar />

        <main className="w-10/12 p-4">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome <span className="text-blue-500">{userDetails?.email}</span>
          </h2>

          <h3 className="text-lg font-semibold mb-4 text-gray-600 text-center">
            All Contacts
          </h3>
          <table className="w-full overflow-x-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-left">
                  First Name
                </th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-left">
                  Last Name
                </th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-left">
                  Phone Number
                </th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts ? (
                contacts.map((contact, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-sm">
                      <button
                        className="mr-2 text-blue-500"
                        onClick={() => handleDetails(contact.contactId)}
                      >
                        {contact.firstName}
                      </button>{" "}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-sm">
                      {contact.lastName}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-sm">
                      {contact.phoneNumber}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-sm">
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
                ))
              ) : (
                <tr>
                  <td
                    className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-sm"
                    colSpan="4"
                  >
                    <div className="flex justify-center items-center">
                      <CircularProgress size={24} color="inherit" />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>

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
                value={editedContact.firstName || ""}
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
                value={editedContact.lastName || ""}
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
                value={editedContact.phoneNumber || ""}
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
          <div className="flex justify-end mt-4">
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
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

export default Dashboard;
