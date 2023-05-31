import { useState } from "react";

export function Pagination({ total, limit, currentPage, onChangePage }) {
  const totalPages = Math.ceil(total / limit);
  const [pagesToShow] = useState(5); // quantidade de páginas a serem exibidas

  // calcula o range de páginas a serem exibidas
  const calculatePageRange = () => {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage, endPage;

    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage - halfPagesToShow <= 0) {
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + halfPagesToShow >= totalPages) {
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPagesToShow;
      endPage = currentPage + halfPagesToShow;
    }

    return { startPage, endPage };
  };

  // gera os números das páginas a serem exibidos
  const generatePageNumbers = () => {
    const { startPage, endPage } = calculatePageRange();
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
        </li>
        {generatePageNumbers().map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onChangePage(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </li>
      </ul>
    </nav>
  );
}
