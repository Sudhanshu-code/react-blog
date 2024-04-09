import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...prop
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      type={type}
      {...prop}
    >
      {children} {/* btn text passed as prop */}
    </button>
  );
};

export default Button;
