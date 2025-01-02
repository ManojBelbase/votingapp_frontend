import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login, loading } = useContext(AuthContext); // Access login function and loading state from context
  const navigate = useNavigate(); // Use navigate to redirect user after successful login

  // Validation schema for login
  const validationSchema = Yup.object({
    voterId: Yup.number().required("Voter ID is required"),
    password: Yup.string().required("Password is required"),
  });

  // Initial values for the login form
  const initialValues = {
    voterId: "",
    password: "",
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    login(values);
  };

  return (
    <div className="bg-[#001124] min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            {/* Voter ID */}
            <div className="flex flex-col">
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="voterId"
              >
                Voter ID
              </label>
              <Field
                type="number"
                name="voterId"
                className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your voter ID"
              />
              <ErrorMessage
                name="voterId"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
