
import React from "react";
import { Pagination } from "react-bootstrap";

export default function SmartPagination({ pageNumber, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (pageNumber > 3) {
        pages.push("left-ellipsis");
      }

      const start = Math.max(2, pageNumber - 1);
      const end = Math.min(totalPages - 1, pageNumber + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (pageNumber < totalPages - 2) {
        pages.push("right-ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <Pagination className="justify-content-center mt-4 flex-wrap">
      {/* First */}
      <Pagination.First
        disabled={pageNumber === 1}
        onClick={() => onPageChange(1)}
      />

      {/* Prev */}
      <Pagination.Prev
        disabled={pageNumber === 1}
        onClick={() => onPageChange(pageNumber - 1)}
      />

      {/* Compact (mobile) */}
      <Pagination.Item active className="d-md-none">
        {pageNumber} / {totalPages}
      </Pagination.Item>

      {/* Full (desktop) */}
      <span className="d-none d-md-flex">
        {pages.map((p, idx) =>
          p === "left-ellipsis" || p === "right-ellipsis" ? (
            <Pagination.Ellipsis key={idx} disabled />
          ) : (
            <Pagination.Item
              key={p}
              active={p === pageNumber}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Pagination.Item>
          )
        )}
      </span>

      {/* Next */}
      <Pagination.Next
        disabled={pageNumber === totalPages}
        onClick={() => onPageChange(pageNumber + 1)}
      />

      {/* Last */}
      <Pagination.Last
        disabled={pageNumber === totalPages}
        onClick={() => onPageChange(totalPages)}
      />
    </Pagination>
  );
}
