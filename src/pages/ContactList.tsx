import React from "react";

const ContactList = () => {
  // Dummy contacts data
  const contacts = [
    { id: 1, firstName: "John", lastName: "Doe", phoneNumber: "123-456-7890" },
    { id: 2, firstName: "Jane", lastName: "Doe", phoneNumber: "234-567-8901" },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Smith",
      phoneNumber: "345-678-9012",
    },
    {
      id: 4,
      firstName: "Bob",
      lastName: "Johnson",
      phoneNumber: "456-789-0123",
    },
  ];

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
                First Name
              </th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase">
                Last Name
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
                  {contact.firstName}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {contact.lastName}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {contact.phoneNumber}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  <button className="mr-2 text-blue-500 hover:text-blue-600">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
