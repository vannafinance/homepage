import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({
  className = "",
  children,
  redirectTo = "/",
  containerClassName = "",
  shouldOpenInNewTab = false,
}) => {
  return (
    <NavLink
      to={redirectTo}
      className={`w-fit ${containerClassName}`}
      target={shouldOpenInNewTab ? "_blank" : "_self"}
      // rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
    >
      <button className={className}>{children}</button>
    </NavLink>
  );
};

export default Button;
