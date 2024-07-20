import { z } from 'zod';
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nombre Campo requerido' })
    .min(3, { message: 'longitud minima 3' })
    .max(20),
  lastname: z
    .string()
    .min(1, { message: 'Apellido Campo requerido' })
    .min(3, { message: 'longitud minima 3' })
    .max(20),
  email: z
    .string()
    // .number({ coerce: true, invalid_type_error: 'el campo debe ser numerico' })
    .min(1, { message: 'el Correo es requerido' })
    .email('correo invalido'),
});

export type contact = z.infer<typeof contactSchema> & { id: string };
