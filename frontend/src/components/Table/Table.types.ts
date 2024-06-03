import { Ordenation } from "@/types/Common";

export interface ITable {
  children: React.ReactNode;
  label: string;
}

export type OnChangeOrdenation = (column: string, order: Ordenation) => void;

export type TColumns = {
  label: string;
  order?: string;
};
