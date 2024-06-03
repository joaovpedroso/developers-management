"use client";

import { useMemo, useState } from "react";
import { Ordenation, OrdenationEnum } from "@/types/Common";
import { Grid, TableCell, TableHead, TableRow } from "@mui/material";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { OnChangeOrdenation, TColumns } from "../Table.types";
import { clearString } from "@/utils";

const Header = ({
  columns,
  onChangeOrdenation,
}: {
  columns: TColumns[];
  onChangeOrdenation: OnChangeOrdenation;
}) => {
  const [ordenedColumn, setOrdenedColumn] = useState<null | string>();
  const [ordenedType, setOrdenedType] = useState<Ordenation>(
    OrdenationEnum.asc
  );

  const OrderIcon = useMemo(() => {
    if (ordenedType === OrdenationEnum.asc) return ArrowDropUpIcon;

    return ArrowDropDownIcon;
  }, [ordenedType]);

  const handleOrderColumn = (columnName: string) => {
    const clearedName = clearString(columnName);

    setOrdenedColumn(columnName);

    const ordenation =
      ordenedType === OrdenationEnum.asc
        ? OrdenationEnum.desc
        : OrdenationEnum.asc;

    setOrdenedType(ordenation);

    onChangeOrdenation(clearedName, ordenation);
  };

  return (
    <TableHead
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <TableRow>
        {columns.map((column) => (
          <TableCell
            align="left"
            key={column.label}
            onClick={() => {
              if (column.order) handleOrderColumn(column.order);
            }}
          >
            <Grid container alignItems="center">
              {column.label}
              {column.order && column.order === ordenedColumn && <OrderIcon />}
            </Grid>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export { Header };
