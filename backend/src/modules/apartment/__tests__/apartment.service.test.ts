import { createApartmentService, listApartmentsService, getApartmentService } from '../apartment.service';
import prisma from '../../../prismaClient';

describe('Apartment Service', () => {
  let createdApartmentId: string;

  it('should create an apartment', async () => {
    const input = {
      unitName: 'Test Unit',
      unitNumber: '101',
      projectName: 'Test Project',
      price: 1000,
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      description: 'Nice apartment',
      images: [],
    };

    const created = await createApartmentService(input);
    createdApartmentId = created.id;

    expect(created).toHaveProperty('id');
    expect(created.unitName).toBe('Test Unit');
  });

  it('should list apartments', async () => {
    const result = await listApartmentsService({ page: 1, limit: 10 });
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('should get apartment by id', async () => {
    const apartment = await getApartmentService(createdApartmentId);
    expect(apartment).toBeDefined();
    expect(apartment?.id).toBe(createdApartmentId);
  });
});
