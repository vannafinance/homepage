import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({
  className = "",
  children,
  redirectTo = "/",
  containerClassName = "",
  target = "_blank",
}) => {
  const isInternal = redirectTo.startsWith("/") && !redirectTo.startsWith("//");
  const computedTarget = isInternal ? "_self" : target;
  return (
    <NavLink
      to={redirectTo}
      className={`w-fit ${containerClassName}`}
      target={computedTarget}
    >
      <button className={className}>{children}</button>
    </NavLink>
  );
};

export default Button;
