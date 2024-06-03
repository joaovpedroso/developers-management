import { Box, Paper, Table as MuiTable, TableContainer } from "@mui/material";
import { Header } from "./Header";
import { Body } from "./Body";
import { ITable } from "./Table.types";

const TableComponent = ({ children, label }: ITable) => {
  return (
    <Box sx={{ marginTop: "24px" }}>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }} aria-label={label}>
          {children}
        </MuiTable>
      </TableContainer>
    </Box>
  );
};

const Table = {
  default: TableComponent,
  header: Header,
  body: Body,
};

export { Table };
