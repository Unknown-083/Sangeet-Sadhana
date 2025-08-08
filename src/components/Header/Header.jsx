import React, {useState} from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import LogoutBtn from "./LogoutBtn";
import { useAuthContext } from "../../context/authContext";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { state } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
      {/* Logo */}
      <div className="w-16 sm:w-20 flex-shrink-0">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="rounded-full border border-white w-full h-auto"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex gap-6 text-white items-center text-base lg:text-lg">
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

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="absolute top-16 right-0 w-2/3 rounded-lg bg-gray-800 border-l border-gray-700 md:hidden p-4">
          <ul className="flex flex-col gap-4 text-white text-lg">
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
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {state.status && (
              <li>
                <NavLink to={"/"} onClick={() => setMenuOpen(false)}>
                  <LogoutBtn />
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
