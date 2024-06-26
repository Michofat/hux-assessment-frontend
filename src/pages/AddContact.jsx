import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { decodeTokenFromStorage } from "../utils/token";
import { checkedLoggedIn } from "../utils/checkLoggedIn";
import Header from "../components/Header";

const NewContact = () => {
  const navigate = useNavigate();
  const userDetails = decodeTokenFromStorage();

  useEffect(() => {
    checkedLoggedIn(userDetails, navigate);
  }, [navigate, userDetails]);

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/contact",
        data
      );
      alert("Contact submitted successfully:", response.data);
      setIsLoading(false);
    } catch (error) {
      alert("Failed to submit contact:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex">
        <SideBar />

        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Contact Form</h1>
            <p className="mt-4 text-gray-500">
              Please enter the details below to submit the contact
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", { required: true })}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter First Name"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">First Name is required</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", { required: true })}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Last Name"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">Last Name is required</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{11,15}$/,
                    message:
                      "Phone Number must be between 11 and 15 digits and contain numbers only",
                  },
                })}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Phone Number"
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewContact;
