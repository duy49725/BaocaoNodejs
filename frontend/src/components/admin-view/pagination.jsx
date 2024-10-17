// components/ui/pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };
  console.log(totalPages)
  const pages = [...Array(totalPages).keys()].map(x => x + 1); // Tạo mảng từ 1 đến totalPages

  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="flex space-x-2">
          {pages.map((page) => (
            <li key={page}>
              <button
                onClick={() => handleClick(page)}
                className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
