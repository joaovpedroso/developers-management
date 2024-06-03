import { DeveloperGenre } from "@/app/desenvolvedores/Developers.types";
import { useCreateDeveloper, useLevels, useUpdateDevelopers } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DeveloperSchema, DeveloperTypeForm } from "./schema";
import { IDeveloperForm } from "./DeveloperForm.types";

const DeveloperForm = ({
  isOpen,
  developer,
  onCancel,
  onSuccess,
}: IDeveloperForm) => {
  const form = useForm<DeveloperTypeForm>({
    resolver: zodResolver(DeveloperSchema),
    mode: "onChange",
    values: developer ?? {
      id: null,
      nome: "",
      data_nascimento: "",
      hobby: "",
      sexo: "",
      nivel_id: 0,
    },
  });

  const { update, isPending: isPendingUpdate } = useUpdateDevelopers({
    onSuccess: () => {
      form.reset();
      toast.success("Salvo com sucesso!");
      onSuccess();
    },
    onError: () => {
      toast.error("Não foi possível salvar.");
    },
  });

  const { create, isPending: isPendingCreate } = useCreateDeveloper({
    onSuccess: () => {
      form.reset();
      toast.success("Desenvolvedor cadastrado com sucesso!");
      onSuccess();
    },
    onError: () => {
      toast.error("Não foi possível cadastrar.");
    },
  });

  const levels = useLevels();

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmitForm = (formValues: DeveloperTypeForm) => {
    if (developer?.id) return update({ ...formValues, id: developer.id });

    create(formValues);
  };

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="form-developers-title"
      aria-describedby="form-developers-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-developers-title">
        {developer && developer.nome ? developer.nome : "Desenvolvedor"}
      </DialogTitle>

      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={6} marginBottom="12px">
              <Controller
                name="nome"
                control={form.control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <TextField
                      id="name-input-label"
                      placeholder="Nome do desenvolvedor"
                      label="Nome"
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

            <Grid item xs={12} md={3} marginBottom="12px">
              <Controller
                name="sexo"
                control={form.control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <InputLabel id="select-gender-label">Sexo</InputLabel>
                    <Select
                      labelId="select-gender-label"
                      onChange={onChange}
                      value={value ?? ""}
                      fullWidth
                      error={!!error}
                    >
                      <MenuItem value={DeveloperGenre.Masculino}>
                        Masculino
                      </MenuItem>
                      <MenuItem value={DeveloperGenre.Feminino}>
                        Feminino
                      </MenuItem>
                    </Select>

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

            <Grid item xs={12} md={3} marginBottom="12px">
              <Controller
                name="nivel_id"
                control={form.control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <InputLabel id="select-level-label">Nível</InputLabel>
                    <Select
                      labelId="select-level-label"
                      onChange={onChange}
                      value={value ?? ""}
                      fullWidth
                      error={!!error}
                    >
                      {levels.data?.data?.map((nivel) => (
                        <MenuItem key={nivel.id} value={nivel.id}>
                          {nivel.nivel}
                        </MenuItem>
                      ))}
                    </Select>

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

            <Grid item xs={12} md={6} marginBottom="12px">
              <Controller
                name="data_nascimento"
                control={form.control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <TextField
                      id="data-nascimento"
                      label="Data de nascimento"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
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

            <Grid item xs={12} md={6} marginBottom="12px">
              <Controller
                name="hobby"
                control={form.control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <TextField
                      id="name-input-label"
                      placeholder="Um Hobby"
                      label="Hobby"
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

export { DeveloperForm };
