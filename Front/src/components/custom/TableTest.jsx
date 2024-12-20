import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../../hooks/use-toast';
import { useAxiosInstance } from "../../hooks/axiosInstance";
import CustomToast from './CustomToast';
import GenericTable from './TableGeneric';
import { useNavigate } from 'react-router-dom';
import { schemaPrueba } from '../../schemas/validationSchemas';
import DialogMachine from './DialogMachine';
import DialogCreateEntity from './DialogCreateEntity';
import AlertDelete from './AlertDelete';


export function TableTest() {
    const [pruebas, setPruebas] = useState([]);
    const [prevPruebas, setPrevPruebas] = useState([]);
    const [columnNames, setColumnNames] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState('');
    const { toast, showToast } = useToast();
    const axiosInstance = useAxiosInstance();
    const [hasNavigated, setHasNavigated] = useState(false);
    const navigate = useNavigate();
    const [tablaVisible, setTablaVisible] = useState(true);
    const [errorFetching, setErrorFetching] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCrearBotonVisible, setIsCrearBotonVisible] = useState(true);
    const [isEncenderDialogOpen, setIsEncenderDialogOpen] = useState(false);
    const [isApagarDialogOpen, setIsApagarDialogOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [errores, setErrores] = useState({});
    const realizada = "realizada"
    const enProceso = "en proceso";
    const [userRole, setUserRole] = useState(null);
    const rol = localStorage.getItem("role");
    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);


    // Definimos las instrucciones para esta tabla específica
    const instructions = [
        { action: "Doble clic", description: "Para ver las estadisticas y el grafico de la prueba." },
        { action: "Clic simple", description: "Encendido y/o apagado de la maquina para la prueba." },
        { action: "Filtro", description: "Filtra los datos según el criterio seleccionado." },
        { action: "Eliminar", description: "Haz clic en el ícono de basura para eliminar la prueba." }
    ];

    const handleTrashClick = (e, idprueba) => {
        e.stopPropagation();
        if (rol === '"admin"') {
            setSelectedItemId(idprueba);
            setOpen(true);
        } else {
            showToast('Error, solo el admin puede borrar.', 'error');
        }
    };

    const fetchPruebas = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/test/getTests`);
            if (response.data && response.data.length > 0) {
                const isDifferent = JSON.stringify(response.data) !== JSON.stringify(prevPruebas);

                if (isDifferent) {
                    setPruebas(response.data);
                    setPrevPruebas(response.data);
                    setErrorFetching(false);
                }
            } else {
                setPruebas([]);
                setPrevPruebas([]);
                setErrorFetching(true);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error. No se encontraron pruebas.";
            showToast(`${errorMessage}`, 'error');
            setErrorFetching(true);
        }
    }, [axiosInstance, prevPruebas, showToast]);

    const fetchColumnNames = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/test/getColumns');
            if (response.data && response.data.columnas) {
                const columns = response.data.columnas;
                setColumnNames(columns);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error fetching column names.";
            showToast(`${errorMessage}`, 'error');
        }
    }, [axiosInstance]);

    useEffect(() => {
        fetchPruebas();
        fetchColumnNames();
        const storedRole = localStorage.getItem('role');
        setUserRole(storedRole);

        const intervalId = setInterval(() => {
            fetchPruebas();
        }, 2000);

        return () => clearInterval(intervalId);
    }, [fetchPruebas, fetchColumnNames]);


    const handleRowDoubleClick = async (idprueba, estado) => {
        if (hasNavigated) {
            return;
        }

        try {
            let response;
            let formData;

            if (estado === realizada) {
                response = await axiosInstance.get(`/station/getById/${idprueba}`);
                formData = { ...response.data };

                if (Object.keys(formData).length > 0) {
                    navigate(`/Statics/${estado}`, { state: { formData, idprueba } });
                    setHasNavigated(true);
                }
            } else if (estado === enProceso) {
                setHasNavigated(true);
                navigate(`/Statics/${estado}`, { state: { idprueba } });
            } else {
                showToast('Esta prueba no ha comenzado.', 'error');
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Intenta nuevamente.";
            showToast(`Error: ${errorMessage}`, 'error');
        }
    };

    const handleRowClickDialog = (rowData) => {
        if (rowData.estado === "pendiente") {
            setSelectedRowData(rowData);
            setIsEncenderDialogOpen(true);
        } else if (rowData.estado === "en proceso") {
            setSelectedRowData(rowData);
            setIsApagarDialogOpen(true);
        }
    };


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleEncenderMaquina = async () => {
        try {
            const { idequipo, idestacion, idprueba, estado } = selectedRowData || {};
            if (!idequipo || !idestacion || !idprueba || !estado) {
                showToast("Faltan datos para construir los subtemas.");
            }
            const response = await axiosInstance.post("/mqtt/encender", { idequipo, idestacion, idprueba, estado });
            if (response.status === 200) {
                localStorage.setItem("horaEncendido", formatDate(new Date()));
                const updateStatusResponse = await axiosInstance.put('/test/updateStatus', {
                    idPrueba: idprueba,
                    estado: 'en proceso'
                });
                if (updateStatusResponse.status === 200) {
                    showToast("Estado de la prueba actualizado con éxito", "success");
                    fetchPruebas();
                } else {
                    showToast("Error al actualizar el estado de la prueba", "error");
                }
                showToast("Máquina encendida con éxito", "success");
                setIsEncenderDialogOpen(false);
            } else {
                showToast("Hubo un problema al encender la máquina.", "error");
            }
        } catch (error) {
            showToast(error.message || "Error al encender la máquina", "error");
        }
    };

    const handleApagarMaquina = async () => {
        try {
            const { idequipo, idestacion, idprueba, estado } = selectedRowData || {};

            if (!idequipo || !idestacion || !idprueba || !estado) {
                showToast("Faltan datos para construir los subtemas.", "error");
            }
            const response = await axiosInstance.post("/mqtt/apagar", { idequipo, idestacion, idprueba, estado });
            if (response.status === 200) {
                showToast("Máquina apagada con éxito", "success");
                setIsApagarDialogOpen(false);
            } else {
                showToast("Hubo un problema al apagar la máquina.", "error");
            }
        } catch (error) {
            showToast(error.message || "Error al apagar la máquina", "error");
        }
    };

    const handleFiltroCambio = (value) => {
        setEstadoFiltro(value === "todos" ? '' : value);
    };


    const handleEliminar = async (idprueba) => {
        try {
            const response = await axiosInstance.delete(`/test/deleteTest/${idprueba}`);
            if (response.status === 200) {
                setPruebas(prevPruebas => prevPruebas.filter(prueba => prueba.idprueba !== idprueba));
                showToast('Prueba eliminada con éxito.', 'success');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Hubo un error al eliminar la prueba.";
            showToast(`Error: ${errorMessage}`, 'error');
        }
    };

    const [pruebaNueva, setPruebaNueva] = useState({
        idequipo: '',
        idestacion: ''

    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPruebaNueva((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleCrearPrueba = async (e) => {
        e.preventDefault();
        try {
            schemaPrueba.parse(pruebaNueva);
            setErrores({});

            const response = await axiosInstance.post(`/test/createTest`, pruebaNueva);

            if (response.status === 200) {
                showToast("Prueba creado con éxito", 'success');
                setPruebaNueva({
                    idequipo: '',
                    idestacion: '',
                });
                fetchPruebas();
                setIsDialogOpen(false);
                setIsCrearBotonVisible(true);

            }
        } catch (error) {
            if (error) {
                const validationErrors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrores(validationErrors);
            } else {
                showToast(error.message || "Error al crear la prueba", 'error');
            }
        }
    };

    const fields = [
        {
            label: 'ID del Equipo',
            accessor: 'idequipo',
            type: 'input',
            value: pruebaNueva.idequipo,
            onChange: handleInputChange
        },
        {
            label: 'ID de la Estación',
            accessor: 'idestacion',
            type: 'input',
            value: pruebaNueva.idestacion,
            onChange: handleInputChange
        }
    ];

    const pruebasFiltradas = estadoFiltro
        ? pruebas.filter(prueba => prueba.estado === estadoFiltro)
        : pruebas;

    return (
        <>
            <CustomToast message={toast.message} type={toast.type} />





            <GenericTable
                entity={"prueba"}
                data={pruebasFiltradas}
                columns={columnNames.map(col => ({ label: col, accessor: col }))}
                rowClickHandler={handleRowDoubleClick}
                onRowClickDialog={handleRowClickDialog}
                filterOptions={[
                    { value: 'todos', label: 'Todos' },
                    { value: 'en proceso', label: 'En Proceso' },
                    { value: 'realizada', label: 'Realizada' },
                    { value: 'pendiente', label: 'Pendiente' }

                ]}
                filterValue={estadoFiltro}
                onFilterChange={handleFiltroCambio}
                onTrashClick={handleTrashClick}
                instructions={instructions}
            />
            {userRole === '"admin"' && tablaVisible && (
                <DialogCreateEntity
                    entity={"prueba"}
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    title="Crear Prueba"
                    fields={fields}
                    onSubmit={handleCrearPrueba}
                    errors={errores}
                    submitButtonText="Guardar"
                    cancelButtonText="Cancelar"
                />
            )}

            <DialogMachine
                open={isEncenderDialogOpen}
                onOpenChange={setIsEncenderDialogOpen}
                title={"Encender Máquina"}
                message={"¿Desea encender la máquina seleccionada?"}
                onConfirm={handleEncenderMaquina}
                confirmText={"Encender"}
                cancelText={"Cancelar"}
            />


            <DialogMachine
                open={isApagarDialogOpen}
                onOpenChange={setIsApagarDialogOpen}
                title={"Apagar Máquina"}
                message={"¿Desea apagar la máquina seleccionada?"}
                onConfirm={handleApagarMaquina}
                confirmText={"Apagar"}
                cancelText={"Cancelar"}
            />

            <AlertDelete
                open={open}
                setOpen={setOpen}
                onDelete={handleEliminar}
                selectedItemId={selectedItemId}
                title={"¿Estas seguro?"}
                description={"Esta acción no se puede deshacer. Eliminarás permanentemente este ítem."}
                textButtonAceptar={"Continuar"}
                textButtonCancelar={"Cancelar"}
            />

        </>
    );
}