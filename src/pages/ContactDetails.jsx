import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { CircularProgress } from "@mui/material";

const ContactDetails = () => {
  const { contactId } = useParams();
  const [contactDetails, setContactDetails] = useState(null);

  useEffect(() => {
    fetchContactDetails(contactId);
  }, [contactId]);

  const fetchContactDetails = async (contactId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/contact/${contactId}`
      );
      const contactDetails = response.data.result;
      setContactDetails(contactDetails);
    } catch (error) {
      alert("Error fetching contact details:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* App Header */}
      <Header />
      {/* Main Content */}
      <div className="flex">
        <SideBar />

        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          {contactDetails ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">First Name:</p>
                  <p>{contactDetails.firstName}</p>
                </div>
                <div>
                  <p className="font-semibold">Last Name:</p>
                  <p>{contactDetails.lastName}</p>
                </div>
                <div>
                  <p className="font-semibold">Phone Number:</p>
                  <p>{contactDetails.phoneNumber}</p>
                </div>
              </div>
            </div>
          ) : (
            <CircularProgress size={24} color="inherit" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
