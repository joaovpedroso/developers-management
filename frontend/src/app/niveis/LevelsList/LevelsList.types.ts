import { INivel } from "@/app/desenvolvedores/Developers.types";
import { OnChangeOrdenation } from "@/components/Table";
import { ActionEnum, IResponseData } from "@/types/Common";

export interface ILevelsList extends IResponseData<INivel> {
  onChangeOrdenation: OnChangeOrdenation;
  onChangePerPage: (perPage: string) => void;
  onChangePage: (page: number) => void;
  onSelectItem?: (developerID: number, action: ActionEnum) => void;
}
