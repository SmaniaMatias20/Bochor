"use client";

import { useState } from "react";
import { Input } from "../shadcn/input";
import { Textarea } from "../shadcn/textarea";
import { Button } from "../shadcn/button";
import { Label } from "../shadcn/label";
import { useToast } from "../../hooks/use-toast";
import logoOriginal from "../../img/logo-original.png"

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Aquí puedes agregar la lógica para enviar los datos al backend
            console.log("Datos enviados:", formData);

            // Mostrar mensaje de éxito
            toast({
                title: "Mensaje enviado",
                description: "Nos pondremos en contacto contigo pronto.",
            });

            // Restablecer el formulario
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);

            // Mostrar mensaje de error
            toast({
                variant: "destructive",
                title: "Error",
                description: "Hubo un problema al enviar tu mensaje.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">Formulario de contacto</h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6 bg-white border-2 border-gray-300 shadow-2xl rounded-xl w-full"
            >
                {/* Imagen en la parte superior del formulario */}
                <div className="flex items-center justify-center">
                    <img
                        src={logoOriginal} // Reemplaza esta URL con la ruta de tu imagen
                        alt="Imagen descriptiva"
                        className="w-40 h-40 rounded-lg object-cover"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Escribe tu nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Correo Electrónico</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Asunto</Label>
                    <Input
                        id="subject"
                        name="subject"
                        placeholder="Motivo del mensaje"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Mensaje</Label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Escribe tu mensaje aquí..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 hover:bg-gray-950 text-white font-medium py-2 px-4 rounded-lg"
                >
                    {loading ? "Enviando..." : "Enviar"}
                </Button>
            </form>
        </>
    );
};

export default ContactForm;
