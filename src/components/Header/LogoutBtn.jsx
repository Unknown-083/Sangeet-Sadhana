import React from "react";
import authService from "../../appwrite/auth";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const {logout} = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout()
    .then(() => logout())
    .then(() => navigate('/login'));
  }
  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 bg-violet-700 hover:bg-violet-800 text-white rounded-full shadow transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
