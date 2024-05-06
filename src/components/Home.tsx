// import * as React from "react";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to Contact Manager
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          Contact Manager is a simple yet powerful tool to organize and manage
          your contacts efficiently.
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4">
            Sign Up
          </button>
          <button className="bg-gray-700 text-white py-2 px-4 rounded-lg">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
