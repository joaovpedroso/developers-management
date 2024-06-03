import { IDeveloper } from "@/app/desenvolvedores/Developers.types";

export interface IDeveloperForm {
  isOpen: boolean;
  developer?: IDeveloper;
  onCancel: () => void;
  onSuccess: () => void;
}
