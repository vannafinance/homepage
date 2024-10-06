import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./style.css";
import Button from "../../Components/Button";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDevelopersDropdown, setShowDevelopersDropdown] = useState(false);
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

  const developersMenu = [
    { name: "User Docs", link: "" },
    { name: "Github", link: "" },
    { name: "Technical Docs", link: "" },
    { name: "Whitepaper", link: "" },
    { name: "Bug Bounty", link: "" },
  ];

  const communityMenu = [
    { name: "Discord", link: "", icon: "/assets/icons/discordLogo.svg" },
    { name: "Twitter", link: "", icon: "/assets/icons/xLogo.svg" },
    { name: "Telegram", link: "", icon: "/assets/icons/telegramLogo.svg" },
    { name: "YouTube", link: "", icon: "/assets/icons/youtubeLogo.svg" },
    { name: "Reddit", link: "", icon: "/assets/icons/redditLogo.svg" },
    { name: "Farcaster", link: "", icon: "/assets/icons/farcasterLogo.svg" },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuDropdown = () => {
    // close menu on mobile
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }

    // close dropdowns
    if (showDevelopersDropdown) {
      setShowDevelopersDropdown(false);
    }
    if (showCommunityDropdown) {
      setShowCommunityDropdown(false);
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
            className={`nav__menu ${
              showMenu ? "show-menu bg-white" : "bg-transparent"
            } transition-all`}
            id="nav-menu"
          >
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className="nav__link"
                  onClick={closeMenuDropdown}
                >
                  App
                </NavLink>
              </li>
              {/* <li className="nav__item">
                <NavLink
                  to="https://docs.vannafinance.xyz/vanna"
                  className="nav__link"
                  onClick={closeMenuDropdown}
                  target="_blank"
                  // rel="noopener noreferrer"
                >
                  Documentation
                </NavLink>
              </li> */}
              <div className="relative inline-block">
                <li className="nav__item">
                  <NavLink
                    className="nav__link"
                    onClick={() =>
                      setShowDevelopersDropdown(!showDevelopersDropdown)
                    }
                  >
                    Developers
                    <img
                      src="/assets/icons/downArrow.svg"
                      className="w-4 h-4 inline-block ml-1"
                    />
                  </NavLink>
                </li>
                {showDevelopersDropdown && (
                  <div className="bg-white origin-top-right absolute -left-4 w-40 mt-0.5 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 top-10 z-50 transition-all duration-300 p-1.5">
                    {developersMenu.map((item, index) => (
                      <NavLink
                        className="flex items-center p-3 text-sm font-medium text-[#181822] w-full rounded-lg hover:bg-[#f4f4ff]"
                        key={"dev-" + index}
                        to={item.link}
                        onClick={closeMenuDropdown}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              <li className="nav__item">
                <NavLink
                  to="/"
                  className="nav__link"
                  onClick={closeMenuDropdown}
                >
                  Governance
                </NavLink>
              </li>
              <div className="relative  inline-block">
                <li className="nav__item">
                  <NavLink
                    className="nav__link"
                    onClick={() =>
                      setShowCommunityDropdown(!showCommunityDropdown)
                    }
                  >
                    Community
                    <img
                      src="/assets/icons/downArrow.svg"
                      className="w-4 h-4 inline-block ml-1"
                    />
                  </NavLink>
                </li>
                {showCommunityDropdown && (
                  <div className="bg-white origin-top-right absolute -left-4 w-44 mt-0.5 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 top-10 z-50 transition-all duration-300 p-1.5">
                    {communityMenu.map((item, index) => (
                      <NavLink
                        className="flex items-center p-3 text-sm font-medium text-[#181822] w-full rounded-lg hover:bg-[#f4f4ff]"
                        key={"com-" + index}
                        to={item.link}
                        onClick={closeMenuDropdown}
                      >
                        <img
                          src={item.icon}
                          className="w-6 h-w-6 inline-block mr-2"
                          alt={item.name}
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              {showMenu && (
                <Button
                  containerClassName="w-full"
                  className="w-fit mx-auto gradient-button cursor-pointer text-sm leading-[16.8px] font-bold"
                  redirectTo="https://app.vannafinance.xyz/"
                  shouldOpenInNewTab
                >
                  Launch VANNA
                </Button>
              )}
            </ul>
          </div>

          <Button
            className="nav__button w-fit mx-auto gradient-button cursor-pointer text-sm leading-[16.8px] font-bold"
            redirectTo="https://app.vannafinance.xyz/"
            shouldOpenInNewTab
          >
            Launch VANNA
          </Button>

          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <img
              src={
                showMenu ? "/assets/icons/close.svg" : "/assets/icons/menu.svg"
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
