import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "O e-mail é obrigatorio")
    .toLowerCase()
    .pipe(z.email("Insira um endereço de e-mail válido.")),
  password: z
    .string()
    .min(8, "A senha deve conter no mínimo 8 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
    .regex(
      /[^a-zA-Z0-9]/,
      "A senha deve conter pelo menos um caractere especial.",
    ),

  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
