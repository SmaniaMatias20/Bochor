import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center items-center space-x-4 mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-600 disabled:text-gray-300 p-2 rounded-full hover:bg-gray-200"
            >
                <ChevronLeft size={20} />
            </button>
            <span className="text-gray-600 text-sm">
                {currentPage} - {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-600 disabled:text-gray-300 p-2 rounded-full hover:bg-gray-200"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
