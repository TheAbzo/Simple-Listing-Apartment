import axios from 'axios';
import { Apartment, PaginatedApartments } from '../types/apartment';

const API_URL = 'http://localhost:4000/api/apartments';

export type CreateApartmentInput = Omit<Apartment, 'id' | 'createdAt' | 'updatedAt'>;

export const getApartments = async (
  page: number,
  limit: number,
  search?: string,
  project?: string
): Promise<PaginatedApartments> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { page, limit };
  if (search) params.q = search;
  if (project) params.project = project;

  const response = await axios.get<PaginatedApartments>(API_URL, { params });
  return response.data;
};

export const getApartmentById = async (id: string): Promise<Apartment> => {
  const response = await axios.get<Apartment>(`${API_URL}/${id}`);
  return response.data;
};

export const createApartment = async (
  data: CreateApartmentInput
): Promise<Apartment> => {
  const response = await axios.post<Apartment>(API_URL, data);
  return response.data;
};
