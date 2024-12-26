import { useState, useEffect } from "react";
import { Button } from "../shadcn/button";
import { UserRound, Logs, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logoDefinitivo.webp";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [fieldsNav, setFieldsNav] = useState([
    { name: "INICIO", path: "/" },
    { name: "NOSOTROS", path: "/About" },
    { name: "CONTACTO", path: "/Contact" },

  ]);
  const [selectedButton, setSelectedButton] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleNavigationSecondNavbar = (path, index) => {
    navigate(path);
    setSelectedButton(index);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-50">
      {/* Segundo Navbar con el nuevo estilo */}
      <div className="relative flex flex-row z-50 w-full h-20 bg-white text-lg items-end justify-between px-4 shadow-md">
        <div className="flex items-center">
          <p className="text-lg ml-2 font-semibold truncate w-32 sm:w-auto">
            Logo
          </p>
        </div>
        <div className="hidden sm:flex space-x-4">
          {fieldsNav.map((item, index) => (
            <Button
              key={index}
              variant="link"
              className={`text-gray-700 text-sm !no-underline transition-transform duration-300 ease-in-out relative pb-2`}
              onClick={() => handleNavigationSecondNavbar(item.path, index)} // Llama a la función de navegación del segundo navbar
            >
              {item.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-1 bg-sky-700 transform ${selectedButton === index ? "scale-x-100" : "scale-x-0"
                  } transition-transform duration-150 ease-in-out`}
              />
            </Button>
          ))}
          <Button
            onClick={handleLogout}
            variant="link"
            className="text-gray-700 text-sm pb-2"
          >
            <LogOut />
          </Button>
        </div>
        <div className="sm:hidden flex items-center">
          <Button
            onClick={toggleMenu}
            variant="link"
            className="text-gray-700 text-sm pb-2"
          >
            {isMenuOpen ? <Logs /> : <Logs />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg py-4 px-6">
          <div className="flex flex-col mt-4">
            {fieldsNav.map((item, index) => (
              <Button
                key={index}
                variant="link"
                className="text-gray-700 text-sm !no-underline hover:text-gray-900 hover:font-bold hover:scale-105 transition-all"
                onClick={() => handleNavigationSecondNavbar(item.path)}
              >
                {item.name}
              </Button>
            ))}
            <Button
              onClick={handleLogout}
              variant="link"
              className="text-gray-700 text-sm mt-2 w-full"
            >
              <LogOut />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
