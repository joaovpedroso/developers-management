export interface IDeleteModal {
  isOpen: boolean;
  itemId: number;
  isLoading: boolean;
  onConfirm: (itemId: number) => void;
  onRefuse: () => void;
}
