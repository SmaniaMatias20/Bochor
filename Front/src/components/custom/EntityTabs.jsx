import { useState, useEffect } from "react";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/tabs";
import { schemaUsuario } from "../../schemas/validationSchemas";
import AlertDelete from './AlertDelete';

const EntityTabs = ({
    entity,
    fields,
    onModify,
    onDelete,
    initialValues,
    onCancel,
}) => {
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const validationSchema = entity === "usuario" ? schemaUsuario : null;

    useEffect(() => {
        if (entity === "usuario") {
            let updatedValues = { ...initialValues };
            if (updatedValues.autorizacionTDB === true) {
                updatedValues.autorizacionTDB = "autorizado";
            } else if (updatedValues.autorizacionTDB === false) {
                updatedValues.autorizacionTDB = "no autorizado";
            }

            if (updatedValues.password) {
                updatedValues.password = "*********";
            }

            setFormValues(updatedValues);
        }
    }, [initialValues, entity]);

    const handleChange = (field, value) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        if (validationSchema) {
            try {
                validationSchema.parse(formValues);
                setErrors({});

                const userToSave = { ...formValues };
                if (userToSave.password === "*********") {
                    delete userToSave.password;
                }

                onModify(userToSave);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const validationErrors = error.errors.reduce((acc, curr) => {
                        acc[curr.path[0]] = curr.message;
                        return acc;
                    }, {});
                    setErrors(validationErrors);
                }
            }
        } else {
            onModify(formValues);
        }
    };

    const handleDelete = () => {
        setIsDeleteOpen(true); // Abrir el modal de confirmación
        setSelectedItemId(initialValues.id); // Pasar el ID del elemento a eliminar
    };

    const handleConfirmDelete = (id) => {
        onDelete(id); // Llamar a la función onDelete con el id del elemento
        setIsDeleteOpen(false); // Cerrar el modal
    };

    return (
        <div className="flex items-center justify-center pt-10">
            <Tabs defaultValue="modificar" className="w-[400px] p-4 space-y-4 bg-white shadow-lg rounded-lg">
                <TabsList className="flex space-x-2 border-b justify-center">
                    <TabsTrigger
                        value="modificar"
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Modificar
                    </TabsTrigger>
                    <TabsTrigger
                        value="eliminar"
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Eliminar
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="modificar" className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Modificar {entity}</h3>
                        <form className="space-y-4">
                            {fields.map((field) => (
                                <div key={field.accessor}>
                                    <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                                    {field.type === "select" ? (
                                        <select
                                            value={formValues[field.accessor] || ""}
                                            onChange={(e) => handleChange(field.accessor, e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {field.options.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={formValues[field.accessor] || ""}
                                            onChange={(e) => handleChange(field.accessor, e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                    {errors[field.accessor] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[field.accessor]}</p>
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-sky-900 text-white text-sm font-medium rounded-md hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Guardar Cambios
                                </button>
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </TabsContent>

                <TabsContent value="eliminar" className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Eliminar {entity}</h3>
                        <p className="text-sm text-gray-600">
                            Estás seguro de que deseas eliminar a <strong>{initialValues.usuario}</strong>?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={handleDelete} // Mostrar el modal de eliminación
                                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Eliminar
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Modal de confirmación */}
            <AlertDelete
                open={isDeleteOpen}
                setOpen={setIsDeleteOpen}
                onDelete={handleConfirmDelete}
                selectedItemId={selectedItemId}
                title="Confirmar Eliminación"
                description={`¿Estás seguro de que deseas eliminar a ${initialValues.usuario}?`}
                textButtonAceptar="Eliminar"
                textButtonCancelar="Cancelar"
            />
        </div>
    );
};

export default EntityTabs;
