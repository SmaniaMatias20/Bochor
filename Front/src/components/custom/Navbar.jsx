import { useState, useEffect } from "react";
import { Button } from "../shadcn/button";
import { UserRound, Logs, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logoDefinitivo.webp";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenu1Open, setIsMenu1Open] = useState(false);
  const [fieldsNav, setFieldsNav] = useState([
    { name: "INICIO", path: "/Home" },
    { name: "NOSOTROS", path: "/About" },
    { name: "CONTACTO", path: "/Contact" },

  ]);
  const [selectedButton, setSelectedButton] = useState(null); // Estado para el botón seleccionado del segundo navbar
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenu1 = () => {
    setIsMenu1Open(!isMenu1Open);
  };

  // Modifica esta función para recibir un path
  const handleNavigationFirstNavbar = (path) => {
    navigate(path);
  };

  const handleNavigationSecondNavbar = (path, index) => {
    navigate(path);
    setSelectedButton(index); // Establecer el botón seleccionado del segundo navbar
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="bg-gray-50">
      {/* Segundo Navbar con el nuevo estilo */}
      <div className="relative flex flex-row z-50 w-full h-20 bg-white text-lg items-end justify-between px-4 shadow-md">
        <div className="flex items-center">
          <img
            className="h-12 w-12 object-cover"
            src={logo}
            alt="Logo"
          />
          <p className="text-lg ml-2 font-semibold truncate w-32 sm:w-auto">
            Bochor
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
            <div className="flex flex-row space-x-4 border items-center justify-center h-20">
              <UserRound size={32} />
              <div className="flex flex-col">
                <p className="text-lg text-gray-900">
                  Invitado
                </p>
              </div>
            </div>
            {fieldsNav.map((item, index) => (
              <Button
                key={index}
                variant="link"
                className="text-gray-700 text-sm !no-underline hover:text-gray-900 hover:font-bold hover:scale-105 transition-all"
                onClick={() => handleNavigationSecondNavbar(item.path)} // Llama a la función de navegación del segundo navbar
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
