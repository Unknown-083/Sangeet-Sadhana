import React, { useState } from "react";
import Input from "./Input";
import authService from "../appwrite/auth";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, state} = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email.length>0 && password.length>7) {
      const credentials = await authService.login({email : email, password: password});

      if (credentials){
        console.log(credentials); 
        const userData = await authService.getCurrentUser();
        console.log(userData);
               
        login();
        navigate('/');
      }
      else alert("Check Email and Password");
    }
    // .then((data) => (state.status="true", state.data(data)))
    

    else{
      console.log("Enter valid credentials");      
    }
  };

  return (
    <div className="p-8 w-screen max-w-md mx-12 bg-gray-800 rounded-2xl text-white mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange = {(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange = {(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="mt-4 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
