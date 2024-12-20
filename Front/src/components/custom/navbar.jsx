import React from 'react';
import logo from '../../../public/image.jpg'; // Asegúrate de ajustar la ruta correctamente

const Navbar = () => {
    return (
        <div className="absolute top-0 left-0 w-full bg-cover bg-center">
            <div className="flex items-center justify-between bg-black bg-opacity-50 p-4">
                <nav className="flex space-x-4">
                    <a href="/" className="text-white">Inicio</a>
                    <a href="/about" className="text-white">Sobre Nosotros</a>
                    <a href="/services" className="text-white">Servicios</a>
                    <a href="/contact" className="text-white">Contacto</a>
                </nav>
                <div className="flex">
                    <img src={logo} alt="Logo" className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
