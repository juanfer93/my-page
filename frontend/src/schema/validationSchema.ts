import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z
    .string()
    .email('Correo inválido')
    .transform((val) => val.trim()), 
  phone: z
    .string()
    .min(10, 'Número de teléfono inválido')
    .refine(
      (val) => /^(\d{10}|\d{3}\s\d{3}\s?\d{4}|\d{3}-\d{3}-\d{4})$/.test(val.replace(/\s+/g, '')),
      'Número de teléfono inválido'
    ) 
    .transform((val) => val.replace(/\s+/g, '')), 
});

export type FormData = z.infer<typeof schema>;
