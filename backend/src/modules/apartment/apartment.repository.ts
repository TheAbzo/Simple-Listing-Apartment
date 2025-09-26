import prisma from '../../prismaClient';
import { Prisma } from '@prisma/client';

export const createProjectIfNotExists = async (name: string) => {
  const existing = await prisma.project.findUnique({ where: { name } });
  if (existing) return existing;
  return prisma.project.create({ data: { name } });
};

export const createApartment = async (data: {
  unitName: string;
  unitNumber: string;
  projectId: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description?: string;
  images?: string[];
}) => {
  return prisma.apartment.create({
    data: {
      unitName: data.unitName,
      unitNumber: data.unitNumber,
      projectId: data.projectId,
      price: data.price,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      area: data.area,
      description: data.description ?? null,
      images: data.images ?? [],
    },
  });
};

export type ListParams = {
  limit?: number;
  page?: number;
  q?: string;
  project?: string;
};

export const listApartments = async (params: ListParams) => {
  const { page = 1, limit = 10, q, project } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.ApartmentWhereInput = {};

  if (q) {
    where.OR = [
      { unitName: { contains: q, mode: 'insensitive' } },
      { unitNumber: { contains: q, mode: 'insensitive' } },
      { project: { name: { contains: q, mode: 'insensitive' } } },
    ];
  }

  if (project) {
    where.project = { name: { equals: project, mode: 'insensitive' } };
  }

  const apartments = await prisma.apartment.findMany({
    skip,
    take: limit,
    where,
    orderBy: { createdAt: 'desc' },
    include: { project: true },
  });

  return {
    data: apartments,
    page,
    limit,
  };
};

export const findApartmentById = async (id: string) => {
  return prisma.apartment.findUnique({ where: { id }, include: { project: true } });
};
