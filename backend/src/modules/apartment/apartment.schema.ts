import { z } from 'zod';

export const createApartmentSchema = z.object({
  unitName: z.string().min(1),
  unitNumber: z.string().min(1),
  projectName: z.string().min(1),
  price: z.number().nonnegative(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  area: z.number().nonnegative(),
  description: z.string().optional(),
  images: z.array(z.string().url()).optional(),
});

export type CreateApartmentInput = z.infer<typeof createApartmentSchema>;
