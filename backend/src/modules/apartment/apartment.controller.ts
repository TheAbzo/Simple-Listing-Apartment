import { Request, Response } from 'express';
import { createApartmentSchema } from './apartment.schema';
import * as service from './apartment.service';

export const listHandler = async (req: Request, res: Response) => {
  try {
    const { limit, page, q, project } = req.query;

    const result = await service.listApartmentsService({
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
      q: q as string,
      project: project as string,
    });

    res.json(result);
  } catch (error) {
    console.error('Error in listHandler:', error);
    res.status(500).json({ error: 'Internal server error', details: error });
  }
};



export const getHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const found = await service.getApartmentService(id);

    if (!found) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    res.json(found);
  } catch (error) {
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
