import { Pagination } from "@/components/Pagination";
import { TColumns, Table } from "@/components/Table";
import { ActionEnum } from "@/types/Common";

import { Box, IconButton, TableCell, TableRow } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { LEVEL_COLUMNS } from "./constants";
import { ILevelsList } from "./LevelsList.types";
import { DisabledButton } from "../DisabledButton/DisabledButton";

const LevelsList = ({
  data,
  meta,
  onChangePage,
  onChangePerPage,
  onSelectItem,
  onChangeOrdenation,
}: ILevelsList) => {
  return (
    <>
      <Table.default label="Lista de níveis">
        <Table.header
          columns={LEVEL_COLUMNS}
          onChangeOrdenation={onChangeOrdenation}
        />
        <Table.body
          rows={data.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.nivel}</TableCell>
              <TableCell align="left">{row.developers_count}</TableCell>
              <TableCell align="left">
                <IconButton
                  aria-label="edit"
                  onClick={() => onSelectItem?.(row.id, ActionEnum.EDIT)}
                >
                  <EditIcon color="primary" />
                </IconButton>

                {row.developers_count > 0 ? (
                  <DisabledButton />
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onSelectItem?.(row.id, ActionEnum.DELETE)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        />
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
};

export { LevelsList };
