import React from "react";
import Button from "./Button";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 p-5 mx-10">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="secondary"
      >
        Anterior
      </Button>

      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          variant={currentPage === index + 1 ? "primary" : "secondary"}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="secondary"
      >
        Siguiente
      </Button>
    </div>
  );
}
