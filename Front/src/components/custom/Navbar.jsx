import { useState } from "react";
import { Button } from "../shadcn/button";
import { LogOut } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa'; // Importing WhatsApp icon from react-icons
import { useNavigate } from "react-router-dom";
import logo from '../../img/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const [fieldsNav, setFieldsNav] = useState([
    { name: "INICIO", path: "/" },
    { name: "NOSOTROS", path: "/About" },
    { name: "SERVICIOS", path: "/Services" },
    { name: "CONTACTO", path: "/Contact" },
  ]);

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
      <div className="gap-12 outline border-b-2 ">
        <div className="hidden sm:flex flex-row justify-end ">
          <span className="text-black text-lg font-light rounded-none flex items-center">
            <FaWhatsapp className="mr-2 text-green-500 text-xl" /> {/* Enlarged WhatsApp Icon */}
            +541162559205
          </span>
        </div>
        <div className="sm:hidden flex items-end justify-end mr-1">
          <span className="text-black text-lg font-light rounded-none flex items-center">
            <FaWhatsapp className="mr-2 text-green-500 text-xl" /> {/* Enlarged WhatsApp Icon */}
            +541162559205
          </span>
        </div>
      </div>

      {/* Segundo Navbar con el nuevo estilo */}
      <div className="relative flex flex-row z-50 w-full h-20 bg-white text-lg items-end justify-between px-4 shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-14" />
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
                className={`absolute bottom-0 left-0 w-full h-1 bg-gray-950 transform ${selectedButton === index ? "scale-x-100" : "scale-x-0"
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
