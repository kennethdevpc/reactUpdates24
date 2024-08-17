import { z } from 'zod';
export const searchSchema = z.object({
  search: z
    .string({ required_error: 'Nombre es requerido' })
    .min(2, { message: 'Mínimo 2 caracteres' }),
});
