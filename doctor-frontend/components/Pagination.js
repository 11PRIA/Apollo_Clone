import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="px-2 py-1 mr-2 border rounded">
          Previous
        </button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-2 py-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : ''}`}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className="px-2 py-1 ml-2 border rounded">
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;