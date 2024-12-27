import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-950 text-white py-8">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sección de Acerca de */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Acerca de Nosotros</h3>
                        <p>
                            Somos una empresa dedicada a ofrecer soluciones de recursos humanos
                            con un enfoque humano y profesional. Ayudamos a las organizaciones a
                            conectar con los mejores talentos.
                        </p>
                    </div>

                    {/* Sección de Enlaces */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Enlaces Útiles</h3>
                        <ul>
                            <li><a href="/" className="hover:text-gray-400">Inicio</a></li>
                            <li><a href="/About" className="hover:text-gray-400">Sobre Nosotros</a></li>
                            <li><a href="/Services" className="hover:text-gray-400">Servicios</a></li>
                            <li><a href="/contact" className="hover:text-gray-400">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Sección de Redes Sociales */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Redes Sociales</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <FaFacebook size={30} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-600"
                            >
                                <FaTwitter size={30} />
                            </a>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-500 hover:text-pink-700"
                            >
                                <FaInstagram size={30} />
                            </a>
                            <a
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-900"
                            >
                                <FaLinkedin size={30} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Línea de separación */}
                <div className="mt-8 border-t border-gray-600 pt-4 text-center">
                    <p className="text-sm">
                        &copy; 2024 Bochor Consultores S.A. | Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
