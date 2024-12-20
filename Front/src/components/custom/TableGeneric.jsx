import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/table";
import FilterSelect from './FilterSelect';
import { CircleCheck, CircleX, Trash } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import CustomToast from './CustomToast';
import Pagination from './Pagination';
import TableInstructions from './TableInstruction';

const GenericTable = ({
    entity,
    data,
    columns,
    rowClickHandler,
    filterOptions,
    filterValue,
    onFilterChange,
    onRowClickDialog,
    onTrashClick,
    instructions
}) => {
    const { toast, showToast } = useToast();
    const [clickTimeout, setClickTimeout] = useState(null);
    const filteredData = filterValue
        ? data.filter(item => item.estado === filterValue || item.rol === filterValue)
        : data;


    // Paginacion    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
    ///////////////////////////////////////////////////////////////////////////////

    const handleRowClick = (row) => {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }
        setClickTimeout(setTimeout(() => {
            if (onRowClickDialog) {
                onRowClickDialog(row);
            }
        }, 250));
    };
    const handleRowDoubleClick = (row) => {
        if (row.usuario) {
            rowClickHandler(row.id);
        } else {
            rowClickHandler(row.idprueba, row.estado);
        }
    };
    const jsonBufferToArrayBuffer = (bufferJson) => {
        return new Uint8Array(bufferJson.data).buffer;
    };
    const bufferToDataUrl = (buffer, mimeType) => {
        const blob = new Blob([buffer], { type: mimeType });
        return URL.createObjectURL(blob);
    };

    const convertToPdfUrl = (bufferJson) => {
        const arrayBuffer = jsonBufferToArrayBuffer(bufferJson);
        return bufferToDataUrl(arrayBuffer, 'application/pdf');
    };


    return (
        <div className="flex flex-col items-center mt-20 space-y-2">
            {/* Flex container to align filter and info button horizontally */}
            <div className="flex items-center justify-center space-x-4 w-full">
                {filterOptions && (
                    <FilterSelect
                        filterOptions={filterOptions}
                        filterValue={filterValue}
                        onFilterChange={onFilterChange}
                    />
                )}

                {/* Pass the instructions to TableInstructions */}
                <TableInstructions instructions={instructions} />
            </div>

            {/* Tabla */}
            <div className="w-full max-w-4xl overflow-x-auto">
                {currentItems.length === 0 ? (
                    <div className="text-center text-gray-500 mt-4">No hay datos disponibles.</div>
                ) : (
                    <Table className="border-separate border-spacing-0 w-full bg-white border rounded-md shadow-2xl mt-4">
                        <CustomToast message={toast.message} type={toast.type} />
                        <TableHeader>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableHead key={column.accessor} className="bg-gray-200 text-gray-600 text-center">
                                        {column.label}
                                    </TableHead>
                                ))}
                                {entity === 'prueba' && (
                                    <TableHead className="bg-gray-200 text-gray-600 text-center">#</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentItems.map((row) => (
                                <TableRow
                                    key={row.id || row.idprueba}
                                    className={`cursor-pointer hover:bg-gray-100 rounded-md py-3 px-2`}
                                    onClick={() => handleRowClick(row)}
                                    onDoubleClick={() => handleRowDoubleClick(row)}
                                >
                                    {columns.map((column) => (
                                        <TableCell key={column.accessor} className="text-gray-700 text-center">
                                            {column.accessor === "informe" ? (
                                                row[column.accessor] ? (
                                                    <a
                                                        href={convertToPdfUrl(row[column.accessor])}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <u>Ver PDF</u>
                                                    </a>
                                                ) : (
                                                    <p className='text-red-500'>Sin PDF</p>
                                                )
                                            ) : typeof row[column.accessor] === 'boolean' ? (
                                                <div className="flex justify-center items-center">
                                                    {row[column.accessor] ? (
                                                        <CircleCheck size={20} color="green" />
                                                    ) : (
                                                        <CircleX size={20} color="red" />
                                                    )}
                                                </div>
                                            ) : (
                                                row[column.accessor]
                                            )}
                                        </TableCell>
                                    ))}

                                    {entity === 'prueba' && (
                                        <TableCell className="text-center">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash size={18} onClick={(e) => onTrashClick(e, row.idprueba)} />
                                            </button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
            {/* Paginación con flechas */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default GenericTable;
