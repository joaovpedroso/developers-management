import { OnChangeOrdenation } from "@/components/Table";
import { IDeveloper } from "../Developers.types";
import { ActionEnum, IResponseData, Ordenation } from "@/types/Common";

export interface IDevelopersList extends IResponseData<IDeveloper> {
  onChangeOrdenation: OnChangeOrdenation;
  onChangePerPage: (perPage: string) => void;
  onChangePage: (page: number) => void;
  onSelectItem?: (developerID: number, action: ActionEnum) => void;
}
