import axios from 'axios';
import { Apartment, PaginatedApartments } from '../types/apartment';

const API_URL =
  typeof window === 'undefined'
    ? process.env.API_URL           // SSR / server-side inside Docker
    : process.env.NEXT_PUBLIC_API_URL; // client-side in browser

export type CreateApartmentInput = Omit<Apartment, 'id' | 'createdAt' | 'updatedAt'>;

export const getApartments = async (
  page: number,
  limit: number,
  search?: string,
  project?: string
): Promise<PaginatedApartments> => {
  const params: Record<string, string | number> = { page, limit };
  if (search) params.q = search;
  if (project) params.project = project;

  const response = await axios.get<PaginatedApartments>(`${API_URL}/api/apartments`, { params });
  return response.data;
};

export const getApartmentById = async (id: string): Promise<Apartment> => {
  const response = await axios.get<Apartment>(`${API_URL}/api/apartments/${id}`);
  return response.data;
};

export const createApartment = async (data: CreateApartmentInput): Promise<Apartment> => {
  const response = await axios.post<Apartment>(`${API_URL}/api/apartments`, data);
  return response.data;
};
