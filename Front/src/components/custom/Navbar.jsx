import { useState } from "react";
import { Button } from "../shadcn/button";
import { MdEmail } from 'react-icons/md';
import { HiMenu, HiX } from 'react-icons/hi'; // Importing icons for menu toggle
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
    setIsMenuOpen(!isMenuOpen); // Alterna el estado del menú
  };

  const handleNavigationSecondNavbar = (path, index) => {
    navigate(path);
    setSelectedButton(index);
    setIsMenuOpen(false); // Cierra el menú después de navegar
  };

  return (
    <div className="bg-gray-50">
      {/* Barra superior */}
      <div className="gap-12 outline border-b-2">
        <div className="hidden sm:flex flex-row justify-end ">
          <span className="mr-2 text-black text-lg font-light rounded-none flex items-center">
            <MdEmail className="mr-2 text-red-500 text-xl" /> {/* Icono de Gmail */}
            bochorconsultoresarg@gmail.com
          </span>
        </div>

      </div>

      {/* Segundo Navbar */}
      <div className="relative flex flex-row z-50 w-full h-16 bg-white text-lg justify-between px-4 shadow-md">
        {/* Logo */}
        <div className="flex items-end">
          <img src={logo} alt="Logo" className="h-14" />
        </div>

        {/* Menú para pantallas grandes */}
        <div className="flex items-end hidden sm:flex space-x-4">
          {fieldsNav.map((item, index) => (
            <Button
              key={index}
              variant="link"
              className={`text-gray-700 text-sm !no-underline transition-transform duration-300 ease-in-out relative pb-2`}
              onClick={() => handleNavigationSecondNavbar(item.path, index)}
            >
              {item.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-1 bg-gray-950 transform ${selectedButton === index ? "scale-x-100" : "scale-x-0"
                  } transition-transform duration-150 ease-in-out`}
              />
            </Button>
          ))}
        </div>

        {/* Botón de menú para pantallas pequeñas */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <HiX className="w-8 h-8" /> // Icono de cierre
            ) : (
              <HiMenu className="w-8 h-8" /> // Icono de menú
            )}
          </button>
        </div>
      </div>

      {/* Menú desplegable para dispositivos móviles */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg py-4 px-6">
          <div className="flex flex-col mt-4 space-y-4">
            {fieldsNav.map((item, index) => (
              <Button
                key={index}
                variant="link"
                className="text-gray-700 text-sm !no-underline hover:text-gray-900 hover:font-bold hover:scale-105 transition-all"
                onClick={() => handleNavigationSecondNavbar(item.path, index)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
