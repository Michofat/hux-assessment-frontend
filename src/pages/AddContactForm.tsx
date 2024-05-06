import React, { useState } from "react";

interface Contact {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

const ContactList: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Dummy contacts data
  const contacts: Contact[] = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
    },
    {
      id: 2,
      fullName: "Jane Doe",
      email: "jane@example.com",
      phoneNumber: "234-567-8901",
    },
    {
      id: 3,
      fullName: "Alice Smith",
      email: "alice@example.com",
      phoneNumber: "345-678-9012",
    },
    {
      id: 4,
      fullName: "Bob Johnson",
      email: "bob@example.com",
      phoneNumber: "456-789-0123",
    },
  ];

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleEditSubmit = (data: Contact) => {
    console.log("Editing contact:", data);
    closeModal();
  };

  const handleDeleteSubmit = () => {
    console.log("Deleting contact:", selectedContact);
    closeModal();
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">Contact List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase">
                ID
              </th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase">
                Full Name
              </th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase">
                Email
              </th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase">
                Phone Number
              </th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {contact.id}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {contact.fullName}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {contact.email}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {contact.phoneNumber}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  <button
                    className="mr-2 text-blue-500 hover:text-blue-600"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(contact)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-8 rounded-lg z-10">
            <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>
            <form
              onSubmit={() => handleEditSubmit(selectedContact!)}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={selectedContact?.fullName}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={selectedContact?.email}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={selectedContact?.phoneNumber}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-8 rounded-lg z-10">
            <h2 className="text-xl font-semibold mb-4">Delete Contact</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete the record? This action is
              irreversible.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSubmit}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
