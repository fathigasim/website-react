import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalItems, pageSize, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages === 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <Pagination style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />

            {pages.map(page => (
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Pagination.Item>
            ))}

            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

export default PaginationComponent;
