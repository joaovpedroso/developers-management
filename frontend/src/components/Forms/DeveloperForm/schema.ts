import { z } from "zod";

export const DeveloperSchema = z.object({
  id: z.number().nullish(),
  nome: z.string().min(1, { message: "Nome é obrigatório." }),
  sexo: z
    .string()
    .max(1, { message: "O sexo selecionado é inválido." })
    .min(1, { message: "Obrigatoria seleção do sexo." }),
  nivel_id: z
    .number({ message: "Obrigatoria seleção do nível." })
    .min(1, { message: "Obrigatoria seleção do nível." }),
  data_nascimento: z.string().min(8, { message: "Obrigatorio preenchimento." }),
  hobby: z.string().min(5, { message: "Obrigatorio preenchimento." }),
});

export type DeveloperTypeForm = z.infer<typeof DeveloperSchema>;
