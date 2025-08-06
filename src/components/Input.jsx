import { ID } from "appwrite";
import React, { forwardRef } from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  className = "",
  bgColor = "bg-gray-900",
  textColor = "text-white",
  ...props
}, ref) => {
    const id = ID.unique();
  return (
    <div className="flex flex-col">
    {label && <label className="text-sm mb-1" htmlFor={id}>{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      ref={ref}
      id={id}
      className={`p-3 rounded-3xl ${bgColor} ${textColor} ${className}`}
      {...props}
    />
    </div>
  );
};

export default forwardRef(Input);
