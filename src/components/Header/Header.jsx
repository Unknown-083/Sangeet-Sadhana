import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import LogoutBtn from "./LogoutBtn";
import { useAuthContext } from "../../context/authContext";

const Header = () => {
  const { state } = useAuthContext();

  const navItems = [
    {
      path: "/",
      name: "Home",
      active: true,
    },
    {
      path: "/playlists",
      name: "Playlists",
      active: state.status,
    },
    {
      path: "/contact",
      name: "Contact",
      active: state.status,
    },
    {
      path: "/login",
      name: "Log In",
      active: !state.status,
    },
    {
      path: "/signup",
      name: "Sign Up",
      active: !state.status,
    },
  ];
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="w-20">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="rounded-full border border-white"
          />
        </Link>
      </div>
      <nav>
        <ul className="flex gap-8 text-white items-center text-lg">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `hover:text-violet-400 transition ${
                      isActive ? "text-violet-500" : "text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
          {state.status && (
            <li>
              <NavLink to={"/"}>
                <LogoutBtn />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
