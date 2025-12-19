import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(4).max(40),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterDTO = z.infer<typeof registerSchema>;

export const updateUserSchema = z.object({
  username: z.string().min(4).max(40).optional(),
  email: z.string().email().optional(),
  description: z.string().max(255).nullable().optional(),
  profession: z.string().max(100).nullable().optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
