import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Contact {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

const fetchContacts = async (): Promise<Contact[]> => {
  const { data } = await axios.get<Contact[]>("/api/contacts");
  return data;
};

const editContact = async (contact: Contact): Promise<Contact> => {
  const { data } = await axios.put<Contact>(
    `/api/contacts/${contact.id}`,
    contact
  );
  return data;
};

const deleteContact = async (id: number): Promise<void> => {
  await axios.delete(`/api/contacts/${id}`);
};

const ContactList: React.FC = () => {
  const {
    data: contacts,
    isLoading,
    error,
    refetch,
  } = useQuery<Contact[], Error>("contacts", fetchContacts);

  const { mutate: mutateEdit } = useMutation<Contact, Error, Contact>(
    editContact,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: mutateDelete } = useMutation<void, Error, number>(
    deleteContact,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleEdit = (contact: Contact) => {
    mutateEdit(contact);
  };

  const handleDelete = (id: number) => {
    mutateDelete(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.fullName}</td>
              <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
              <td>
                <button onClick={() => handleEdit(contact)}>Edit</button>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
