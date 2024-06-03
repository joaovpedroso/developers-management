export enum ActionEnum {
  "DELETE" = "delete",
  "EDIT" = "edit",
}

export interface IMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface IResponseData<T> {
  data: T[];
  meta: IMeta;
}

export interface IFilters {
  query?: string;
  perPage?: number;
  page?: number;
  orderBy?: string;
  order: Ordenation;
}

export interface IManipulationCallbacks {
  onSuccess?: () => void;
  onError?: () => void;
}

export enum OrdenationEnum {
  asc = "asc",
  desc = "desc",
}

export type Ordenation = OrdenationEnum;
