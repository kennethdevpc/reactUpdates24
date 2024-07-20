import { z } from 'zod';
export const formSchema = z.object({
  name: z
    .string({ required_error: 'Nombre es requeridorrr' })
    .min(3, { message: 'longitud minima 3' })
    .max(20),
  lastname: z
    .string({ required_error: 'Apellido es requerido' })
    .min(3, { message: 'longitud minima 3' })
    .max(20),
  email: z
    .number({ coerce: true, invalid_type_error: 'el campo debe ser numerico' })
    .min(1, { message: 'el campo es requerido' })
    .min(5, { message: 'el campo debe ser mayor 3' }),
});

export type form = z.infer<typeof formSchema>;
