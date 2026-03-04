"use client";

type PaginationRangeProps = {
  currentPage: number;
  totalPages: number;
  totalDocs: number;
};

export function PaginationRange({ currentPage, totalPages, totalDocs }: PaginationRangeProps) {
  return (
    <div className="">
      <p>
        {totalDocs} resultados, Página {currentPage} de {totalPages}
      </p>
    </div>
  );
}
