import { TablePagination } from "@mui/material";
import { ChangeEvent, MouseEvent } from "react";
import { IPagination } from "./Pagination.types";

const Pagination = ({
  page,
  perPage,
  total,
  handleChangePage,
  handleChangePerPage,
}: IPagination) => {
  const onChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    handleChangePage(page + 1);
  };

  const onChangePerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChangePerPage?.(event.target.value);
  };

  const pageNumber = Number(page - 1);

  return (
    <TablePagination
      component="div"
      count={!isNaN(total) ? total : 0}
      page={!isNaN(pageNumber) ? Number(pageNumber) : 0}
      rowsPerPage={!isNaN(perPage) ? perPage : 0}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangePerPage}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}–${to} de ${count !== -1 ? count : `${to}`}`
      }
      labelRowsPerPage="Por pagina"
    />
  );
};

export { Pagination };
