import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./style.css";
import Button from "../../Components/Button";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };
  return (
    <>
      <header className="header bg-white">
        <nav className="bg-white relative z-[100] w-full max-w-[1280px] mx-auto h-[65px] flex items-center justify-between md:px-10 px-[30px]">
          <div className="w-[134px] h-full flex items-center">

            <NavLink to="/" className="nav__logo">
              <img
                src="/assets/images/vannaLogo.svg"
                className="w-[33.46px] object-contain"
              />
            </NavLink>
          </div>

          <div
            className={`nav__menu ${showMenu ? "show-menu bg-white" : "bg-transparent"} transition-all`}
            id="nav-menu"
          >
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                  App
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="https://docs.vannafinance.xyz/vanna"
                  className="nav__link"
                  onClick={closeMenuOnMobile}
                >
                  Documentation
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/"
                  className="nav__link"
                  onClick={closeMenuOnMobile}
                >
                  Governance
                </NavLink>
              </li>
              {
                showMenu &&
                <Button
                  containerClassName='w-full'
                  className="w-fit mx-auto gradient-button cursor-pointer text-sm leading-[16.8px] font-bold"
                  redirectTo="/"
                >
                  Launch VANNA
                </Button>
              }
            </ul>
          </div>

          <Button
            className="nav__button w-fit mx-auto gradient-button cursor-pointer text-sm leading-[16.8px] font-bold"
            redirectTo="/"
          >
            Launch VANNA
          </Button>

          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <img
              src={
                showMenu
                  ? "/assets/icons/close.svg"
                  : "/assets/icons/menu.svg"
              }
            />
          </div>
        </nav>
      </header>
      <div className="w-full h-[65px]" />
    </>
  );
};

export default Navbar;
