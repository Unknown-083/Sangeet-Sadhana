import React from "react";
import { useAuthContext } from "../context/authContext";
import NotAuthorised from "./NotAuthorised";

const Container = ({ children }) => {
  const { state } = useAuthContext();
  return (
      state.status ? (children) : (<NotAuthorised />)
  );
};

export default Container;
