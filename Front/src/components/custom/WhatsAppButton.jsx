import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Importa el ícono de WhatsApp

const WhatsAppButton = () => {
    return (
        <div className="fixed bottom-4 right-4">
            <a
                href="https://wa.me/541162559205"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-3 px-3 rounded-full shadow-lg flex items-center"
            >
                <FaWhatsapp className="h-8 w-8" />
            </a>
        </div>
    );
};

export default WhatsAppButton;
