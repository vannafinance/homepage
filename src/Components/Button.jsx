import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = ({
  className = "",
  children,
  redirectTo = "/",
  containerClassName = "",
}) => {
  return (
    <NavLink to={redirectTo} className={`w-fit ${containerClassName}`}>
      <button className={className}>
        {children}
      </button>
    </NavLink>
  )
}

export default Button