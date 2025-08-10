import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({
  className = "",
  children,
  redirectTo = "/",
  containerClassName = "",
  target = "_blank"
}) => {
  return (
    <NavLink
      to={redirectTo}
      className={`w-fit ${containerClassName}`}
      target={target}
    >
      <button className={className}>{children}</button>
    </NavLink>
  );
};

export default Button;
