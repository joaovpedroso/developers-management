import { IDeveloper, INivel } from "@/app/desenvolvedores/Developers.types";

export interface ILevelForm {
  isOpen: boolean;
  level?: INivel;
  onCancel: () => void;
  onSuccess: () => void;
}
