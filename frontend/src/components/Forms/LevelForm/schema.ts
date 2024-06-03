import { z } from "zod";

export const LevelSchema = z.object({
  id: z.number().nullish(),
  nivel: z.string().min(1, { message: "Campo nível é obrigatório." }),
});

export type LevelTypeForm = z.infer<typeof LevelSchema>;
