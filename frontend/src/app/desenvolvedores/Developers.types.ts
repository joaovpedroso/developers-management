export interface IDeveloper {
  id: number;
  nome: string;
  sexo: DeveloperGenre;
  data_nascimento: string;
  idade: number;
  hobby: string;
  nivel_id: number;
  nivel: INivel;
}

export enum DeveloperGenre {
  "M" = "Masculino",
  "F" = "Feminino",
  "Masculino" = "M",
  "Feminino" = "F",
}

export interface INivel {
  id: number;
  nivel: string;
  developers_count: number;
  created_at: string;
  updated_at: string;
}

export enum ModalType {
  delete = "DELETION",
  form = "FORM",
  closed = "CLOSED",
}

export interface ICurrentModal<T = any> {
  type: ModalType;
  params: T;
}
