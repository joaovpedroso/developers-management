import { TableBody, TableCell, TableRow } from "@mui/material";

const EmptyResults = ({
  tableColumnsLength,
}: {
  tableColumnsLength: number;
}) => (
  <TableBody>
    <TableRow>
      <TableCell colSpan={tableColumnsLength}>
        Nenhum dado encontrado...
      </TableCell>
    </TableRow>
  </TableBody>
);

export { EmptyResults };
