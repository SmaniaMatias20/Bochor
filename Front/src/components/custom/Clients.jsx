import React from 'react';
import logo1 from '../../img/clients/logo-aie.jpg';
import logo2 from '../../img/clients/logo-alzogaray.png';
import logo3 from '../../img/clients/logo-focus.png';
import logo4 from '../../img/clients/logo-fridays.jpg';
import logo5 from '../../img/clients/logo-lanueva.png';
import logo6 from '../../img/clients/logo-lared.png';
import logo7 from '../../img/clients/logo-monarca.jpg';
import logo8 from '../../img/clients/logo-nacion.png';
import logo9 from '../../img/clients/logo-passo.jpg';
import logo10 from '../../img/clients/logo-perfil.jpg';
import logo11 from '../../img/clients/logo-puelche.png';
import logo12 from '../../img/clients/logo-sc.png';
import logo13 from '../../img/clients/logo-todo.jpg';

const Clients = () => {
    const clients = [
        { id: 1, name: 'Client 1', logo: logo1 },
        { id: 2, name: 'Client 2', logo: logo2 },
        { id: 3, name: 'Client 3', logo: logo3 },
        { id: 4, name: 'Client 4', logo: logo4 },
        { id: 5, name: 'Client 5', logo: logo5 },
        { id: 6, name: 'Client 6', logo: logo6 },
        { id: 7, name: 'Client 7', logo: logo7 },
        { id: 8, name: 'Client 8', logo: logo8 },
        { id: 9, name: 'Client 9', logo: logo9 },
        { id: 10, name: 'Client 10', logo: logo10 },
        { id: 11, name: 'Client 11', logo: logo11 },
        { id: 12, name: 'Client 12', logo: logo12 },
        { id: 13, name: 'Client 13', logo: logo13 },
    ];

    return (
        <div className="container mx-auto p-4">
            {/* Grid Responsivo */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {clients.map((client) => (
                    <div
                        key={client.id}
                        className="flex flex-col items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={client.logo}
                            alt={`${client.name} logo`}
                            className="h-24 w-24 object-contain mb-4"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clients;
