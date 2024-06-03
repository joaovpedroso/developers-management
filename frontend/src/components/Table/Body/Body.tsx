import { TableBody } from "@mui/material";
import { ITableBody } from "./Body.types";

const Body = ({ rows }: ITableBody) => (
  <TableBody>{rows.map((row) => row)}</TableBody>
);

export { Body };
