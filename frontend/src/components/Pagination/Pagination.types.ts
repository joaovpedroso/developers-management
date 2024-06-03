export interface IPagination {
  page: number;
  perPage: number;
  total: number;
  handleChangePage: (page: number) => void;
  handleChangePerPage?: (value: string) => void;
}
