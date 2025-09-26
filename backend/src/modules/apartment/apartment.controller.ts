import { Request, Response } from 'express';
import { createApartmentSchema } from './apartment.schema';
import * as service from './apartment.service';

export const listHandler = async (req: Request, res: Response) => {
  const { limit, page, cursor, q, project } = req.query;
  const result = await service.listApartmentsService({
    limit: limit ? Number(limit) : undefined,
    page: page ? Number(page) : undefined,
    cursor: cursor as string,
    q: q as string,
    project: project as string,
  });
  res.json(result);
};

// export const getHandler = async (req: Request, res: Response) => {
//   const { id } = req.params;
//     console.log("Incoming request for ID:", id); // Debug log

//   const found = await service.getApartmentService(id);
//       console.log("Service result:", found); // Debug log

//   if (!found) return res.status(404).json({ error:` not found  ${found}  id ${id}`});
//   res.json(found);
// };

export const getHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log('Incoming request for ID:', id); // Debug log

  try {
    const found = await service.getApartmentService(id);
    console.log('Service result:', found); // Debug log

    if (!found) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    res.json(found);
  } catch (error) {
    console.error('Error in getHandler:', error);
    res.status(500).json({ error: 'Internal server error', details: error });
  }
};

export const createHandler = async (req: Request, res: Response) => {
  const parsed = createApartmentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }
  try {
    const created = await service.createApartmentService(parsed.data);
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
