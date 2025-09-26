import * as repo from './apartment.repository';

export const createApartmentService = async (input: {
  unitName: string;
  unitNumber: string;
  projectName: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description?: string;
  images?: string[];
}) => {
  const project = await repo.createProjectIfNotExists(input.projectName);
  const created = await repo.createApartment({
    unitName: input.unitName,
    unitNumber: input.unitNumber,
    projectId: project.id,
    price: input.price,
    bedrooms: input.bedrooms,
    bathrooms: input.bathrooms,
    area: input.area,
    description: input.description,
    images: input.images,
  });
  return created;
};

export const listApartmentsService = async (params: repo.ListParams) => {
  return repo.listApartments(params);
};

export const getApartmentService = async (id: string) => {
  return repo.findApartmentById(id);
};
