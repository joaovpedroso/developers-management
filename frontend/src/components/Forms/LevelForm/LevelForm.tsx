import { Controller, useForm } from "react-hook-form";
import { ILevelForm } from "./LevelForm.types";
import { LevelSchema, LevelTypeForm } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateLevel } from "@/hooks/useCreateLevel";
import { toast } from "react-toastify";
import { useUpdateLevel } from "@/hooks/useUpdateLevel";

const LevelForm = ({ isOpen, level, onCancel, onSuccess }: ILevelForm) => {
  const form = useForm<LevelTypeForm>({
    resolver: zodResolver(LevelSchema),
    mode: "onChange",
    values: level ?? {
      id: null,
      nivel: "",
    },
  });

  const { update, isPending: isPendingUpdate } = useUpdateLevel({
    onSuccess: () => {
      form.reset();
      toast.success("Salvo com sucesso!");
      onSuccess();
    },
    onError: () => {
      toast.error("Não foi possível salvar.");
    },
  });

  const { create, isPending: isPendingCreate } = useCreateLevel({
    onSuccess: () => {
      form.reset();
      toast.success("Nível cadastrado com sucesso!");
      onSuccess();
    },
    onError: () => {
      toast.error("Não foi possível cadastrar.");
    },
  });

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmitForm = (formValues: LevelTypeForm) => {
    if (level?.id) return update({ ...formValues, id: level.id });

    create(formValues);
  };

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="form-levels-title"
      aria-describedby="form-levels-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-levels-title">
        {level && level.nivel ? level.nivel : "Nível"}
      </DialogTitle>

      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} marginBottom="12px">
              <Controller
                name="nivel"
                control={form.control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <TextField
                      id="level-input-label"
                      placeholder="Descrição do nível"
                      label="Nível"
                      fullWidth
                      error={!!error}
                      value={value ?? ""}
                      onChange={onChange}
                    />
                    {!!error && (
                      <Typography variant="caption" color="error">
                        {error.message === "Required"
                          ? "Campo obrigatório"
                          : error.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            color="error"
            onClick={handleCancel}
            disabled={isPendingCreate || isPendingUpdate}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPendingCreate || isPendingUpdate}
          >
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { LevelForm };
