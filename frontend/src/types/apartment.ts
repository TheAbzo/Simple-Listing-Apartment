export interface Project {
  id: string;
  name: string;
  location?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Apartment {
  id: string;
  unitName: string;
  unitNumber: string;
  projectId: string;
  project: Project;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedApartments {
  data: Apartment[];
  page: number;
  limit: number;
  total: number;
}
