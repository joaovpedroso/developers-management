import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

import { IDeleteModal } from "./DeleteModal.types";
import { SkeletonButton } from "./SkeletonButton";

const DeleteModal = ({
  isOpen,
  itemId,
  isLoading,
  onConfirm,
  onRefuse,
}: IDeleteModal) => {
  const onCloseModal = () => {
    onRefuse();
  };

  const handleConfirm = () => {
    onConfirm(itemId);
  };

  const handleCancel = () => {
    onRefuse();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Você deseja realmente excluir?
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Essa ação não poderá ser desfeita após a confirmação. <br />
          <strong>Deseja realmente excluir?</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleCancel} disabled={isLoading}>
          Cancelar
        </Button>

        {isLoading ? (
          <SkeletonButton />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            Sim
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export { DeleteModal };
