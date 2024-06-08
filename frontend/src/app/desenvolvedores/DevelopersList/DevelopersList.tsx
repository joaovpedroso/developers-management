import { Pagination } from "@/components/Pagination";
import { Table } from "@/components/Table";
import { ActionEnum, Ordenation, OrdenationEnum } from "@/types/Common";

import { Box, IconButton, TableCell, TableRow } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconAccountTree from "@mui/icons-material/AccountTree";

import { DEVELOPER_COLUMNS } from "./constants";
import { IDevelopersList } from "./DevelopersList.types";
import { formatDateToLocale } from "@/utils";
import { DeveloperGenre } from "../Developers.types";

const DevelopersList = ({
  data,
  meta,
  onChangeOrdenation,
  onChangePage,
  onChangePerPage,
  onSelectItem,
}: IDevelopersList) => (
  <>
    <Table.default label="Lista de desenvolvedores">
      <Table.header
        columns={DEVELOPER_COLUMNS}
        onChangeOrdenation={onChangeOrdenation}
      />

      {!data || data.length < 1 ? (
        <Table.emptyResults tableColumnsLength={7} />
      ) : (
        <Table.body
          rows={data.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.nome}</TableCell>
              <TableCell align="left">{DeveloperGenre[row.sexo]}</TableCell>
              <TableCell align="left">{row.idade}</TableCell>
              <TableCell align="left">
                {formatDateToLocale(row.data_nascimento)}
              </TableCell>
              <TableCell align="left">{row.hobby}</TableCell>
              <TableCell align="left">
                <IconAccountTree color="primary" fontSize="small" />{" "}
                {row.nivel?.nivel}
              </TableCell>
              <TableCell align="left">
                <IconButton
                  aria-label="edit"
                  onClick={() => onSelectItem?.(row.id, ActionEnum.EDIT)}
                >
                  <EditIcon color="primary" />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  onClick={() => onSelectItem?.(row.id, ActionEnum.DELETE)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        />
      )}
    </Table.default>
    <Box
      sx={{
        backgroundColor: "primary.main",
        marginTop: "4px",
      }}
    >
      <Pagination
        page={meta.current_page}
        perPage={meta.per_page}
        total={meta.total}
        handleChangePage={onChangePage}
        handleChangePerPage={onChangePerPage}
      />
    </Box>
  </>
);

export { DevelopersList };
