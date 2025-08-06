import React, { useState } from "react";
import Input from "./Input";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    authService.createAccount({name, email, password})
    .then(() => login())
    .then(() => navigate("/"));
  }

  return (
    <div className="p-8 max-w-md w-screen mx-12 bg-gray-800 rounded-2xl text-white mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type = "text"
          label = "Name"
          placeholder = "Enter your name "
          value = {name}
          required
          onChange = {(e) => setName(e.target.value)}
        />

        <Input
          type = "email"
          label = "Email"
          placeholder = "Enter your email"
          value = {email}
          required
          onChange = {(e) => setEmail(e.target.value)}
        />

        <Input 
          type = "password"
          label = "Password"
          placeholder = "Set your password"
          value = {password}
          required
          onChange = {(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="mt-4 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-full"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
