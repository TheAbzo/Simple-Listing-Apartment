import request from 'supertest';
import express from 'express';
import apartmentRouter from '../apartment.routes';
import prisma from '../../../prismaClient';

const app = express();
app.use(express.json());
app.use('/api/apartments', apartmentRouter);

describe('Apartment Routes', () => {
  let createdApartmentId: string;

  it('POST /api/apartments - should create an apartment', async () => {
    const response = await request(app)
      .post('/api/apartments')
      .send({
        unitName: 'Route Test Unit',
        unitNumber: '202',
        projectName: 'Route Test Project',
        price: 1500,
        bedrooms: 3,
        bathrooms: 2,
        area: 90,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdApartmentId = response.body.id;
  });

  it('GET /api/apartments - should list apartments', async () => {
    const response = await request(app).get('/api/apartments');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/apartments/:id - should get apartment by id', async () => {
    const response = await request(app).get(`/api/apartments/${createdApartmentId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdApartmentId);
  });
});
