import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../../hooks/use-toast';
import { useAxiosInstance } from "../../hooks/axiosInstance";
import CustomToast from './CustomToast';
import GenericTable from './TableGeneric';
import EntityTabs from './EntityTabs';
import { z } from 'zod';
import { schemaUsuario } from '../../schemas/validationSchemas';
import DialogCreateEntity from './DialogCreateEntity';

export function TableUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const [columns, setColumns] = useState([]);
    const [rolFiltro, setRolFiltro] = useState('');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [tablaVisible, setTablaVisible] = useState(true);
    const { toast, showToast } = useToast();
    const axiosInstance = useAxiosInstance();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCrearBotonVisible, setIsCrearBotonVisible] = useState(true);
    const [errores, setErrores] = useState({});

    const instructions = [
        { action: "Doble clic", description: "Para modificar o eliminar un usuario." },
        { action: "Filtro", description: "Filtra los datos según el criterio seleccionado." },
    ];

    const fetchColumns = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/user/getTableColumns');
            if (response.data && response.data.length > 0) {
                setColumns(response.data);
            } else {
                setColumns([]);
            }
        } catch (error) {
            showToast("Error al obtener las columnas", 'error');
        }
    }, [axiosInstance]);

    const fetchUsuarios = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/user/getAllUsers`);
            if (response.data && response.data.length > 0) {
                setUsuarios(response.data);
            } else {
                setUsuarios([]);
            }
        } catch (error) {
            showToast("Error al obtener usuarios", 'error');
        }
    }, [axiosInstance]);

    useEffect(() => {
        fetchUsuarios();
        fetchColumns();
    }, [fetchUsuarios, fetchColumns]);

    useEffect(() => {
        if (usuarioSeleccionado || !tablaVisible) {
            setIsCrearBotonVisible(false);
        } else {
            setIsCrearBotonVisible(true);
        }
    }, [usuarioSeleccionado, tablaVisible]);

    const handleRowClick = (id) => {
        const selectedUser = usuarios.find(user => user.id === id);
        setUsuarioSeleccionado(selectedUser);
        setTablaVisible(false);
        setIsCrearBotonVisible(false);
    };

    const handleFiltroCambio = (value) => {
        setRolFiltro(value === "todos" ? '' : value);
    };

    const handleEliminar = async () => {
        if (!usuarioSeleccionado) return;
        try {
            await axiosInstance.delete(`/user/deleteUser/${usuarioSeleccionado.id}`);
            showToast("Usuario eliminado con éxito", 'success');
            setUsuarioSeleccionado(null);
            setTablaVisible(true);
            setIsCrearBotonVisible(true);
            fetchUsuarios();
        } catch (error) {
            showToast(error.request.response, 'error');
        }
    };

    const handleModificar = async (updatedUser) => {
        if (!usuarioSeleccionado) return;


        if (updatedUser.autorizacionTDB === 'autorizado') {
            updatedUser.autorizacionTDB = true;
        } else if (updatedUser.autorizacionTDB === 'no autorizado') {
            updatedUser.autorizacionTDB = false;
        }

        try {
            const response = await axiosInstance.put(`/user/updateUser/${updatedUser.id}`, updatedUser);
            if (response.status === 200) {
                showToast("Usuario actualizado con éxito", 'success');
                setUsuarioSeleccionado(updatedUser);
                fetchUsuarios();
            } else {
                throw new Error("Hubo un problema al actualizar el usuario.");
            }
        } catch (error) {
            showToast(error.message || "Error al actualizar el usuario", 'error');
        } finally {
            setTablaVisible(true);
        }
    };

    const [nuevoUsuario, setNuevoUsuario] = useState({
        usuario: '',
        password: '',
        rol: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCrearUsuario = async (e) => {
        e.preventDefault();
        try {
            schemaUsuario.parse(nuevoUsuario);
            setErrores({});

            const response = await axiosInstance.post(`/user/createUser`, nuevoUsuario);
            if (response.status === 200) {
                showToast("Usuario creado con éxito", 'success');
                setNuevoUsuario({
                    usuario: '',
                    password: '',
                    rol: '',
                });
                fetchUsuarios();
                setIsDialogOpen(false);
                setIsCrearBotonVisible(true);
            } else {
                throw new Error("Hubo un problema al crear el usuario.");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrores(validationErrors);
            } else {
                showToast(error.message || "Error al crear el usuario", 'error');
            }
        }
    };

    const userColumns = columns
        .filter(col => col !== 'password')
        .map(col => ({
            label: col.charAt(0).toUpperCase() + col.slice(1),
            accessor: col
        }));

    const fields = columns.map((col) => {
        switch (col) {
            case 'usuario':
                return {
                    label: 'Nombre de usuario',
                    accessor: 'usuario',
                    type: 'input'
                };
            case 'password':
                return {
                    label: 'Contraseña',
                    accessor: 'password',
                    type: 'password'
                };
            case 'rol':
                return {
                    label: 'Rol',
                    accessor: 'rol',
                    type: 'select',
                    options: [
                        { label: 'Administrador', value: 'admin' },
                        { label: 'Usuario', value: 'usuario' }
                    ]
                };
            case 'autorizacionTDB':
                // Solo agregar 'autorizacionTDB' si no estamos en el modo 'create' (cuando isDialogOpen está en false)
                if (!isDialogOpen) {
                    return {
                        label: 'Autorización',
                        accessor: "autorizacionTDB",
                        type: 'select',
                        options: [
                            { label: 'Autorizado', value: 'autorizado' },
                            { label: 'No autorizado', value: 'no autorizado' }
                        ]
                    };
                }
                return null;  // No incluir 'autorizacionTDB' en el caso de creación
            default:
                return null;
        }
    }).filter(field => field !== null);

    // Filtra los usuarios en base al rol
    const usuariosFiltrados = rolFiltro
        ? usuarios.filter(user => user.rol === rolFiltro)  // Filtra solo si hay un rol seleccionado
        : usuarios;

    return (
        <>
            <CustomToast message={toast.message} type={toast.type} />

            {tablaVisible && (
                <GenericTable
                    entity={"usuario"}
                    data={usuariosFiltrados}
                    columns={userColumns}
                    rowClickHandler={handleRowClick}
                    filterOptions={[
                        { value: 'todos', label: 'Todos' },
                        { value: 'admin', label: 'Administrador' },
                        { value: 'usuario', label: 'Usuario' }
                    ]}
                    filterValue={rolFiltro}
                    onFilterChange={handleFiltroCambio}
                    instructions={instructions}
                />
            )}

            {tablaVisible && (
                <DialogCreateEntity
                    entity={"usuario"}
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    title="Crear Usuario"
                    fields={fields.map(field => ({
                        ...field,
                        value: nuevoUsuario[field.accessor],
                        onChange: handleInputChange,
                    }))}
                    onSubmit={handleCrearUsuario}
                    errors={errores}
                    submitButtonText="Guardar"
                    cancelButtonText="Cancelar"
                />
            )}

            {/* Mostrar las pestañas solo cuando un usuario está seleccionado y la tabla está oculta */}
            {usuarioSeleccionado && !tablaVisible && (
                <EntityTabs
                    entity={"usuario"}
                    fields={fields}
                    initialValues={usuarioSeleccionado}
                    onModify={handleModificar}
                    onDelete={handleEliminar}
                    onCancel={() => {
                        setTablaVisible(true);
                        setIsCrearBotonVisible(true);
                    }}
                />
            )}
        </>
    );
}
