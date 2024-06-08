import { TableCell, TableRow } from "@mui/material";

const EmptyResults = ({
  tableColumnsLength,
}: {
  tableColumnsLength: number;
}) => (
  <TableRow>
    <TableCell colSpan={tableColumnsLength}>
      Nenhum dado encontrado...
    </TableCell>
  </TableRow>
);

export { EmptyResults };
