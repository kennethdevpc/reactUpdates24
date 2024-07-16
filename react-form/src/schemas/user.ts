import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'el campo es requerido' })
    .min(3, { message: 'longitud minima 3' }),
  lastname: z
    .string()
    .min(1, { message: 'el campo es requerido' })
    .min(3, { message: 'longitud minima 3' }),
  amount: z
    .number({ coerce: true, invalid_type_error: 'el campo debe ser numerico' })
    .min(1, { message: 'el campo es requerido' }),
});

export type userForm = z.infer<typeof userSchema>;
