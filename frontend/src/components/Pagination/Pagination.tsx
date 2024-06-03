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

  return (
    <TablePagination
      component="div"
      count={total}
      page={page - 1}
      rowsPerPage={perPage}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangePerPage}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}–${to} de ${count !== -1 ? count : `${to}`}`
      }
      labelRowsPerPage={"Por pagina"}
    />
  );
};

export { Pagination };
