import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DisabledButton = () => {
  return (
    <Tooltip title="Não é possivel excluir, desenvolvedores associados a esse nível.">
      <span>
        <IconButton aria-label="delete" disabled>
          <DeleteIcon color="disabled" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export { DisabledButton };
