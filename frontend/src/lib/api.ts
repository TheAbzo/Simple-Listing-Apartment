import { Apartment } from '@/types/apartment';

const BASE_URL = 'http://localhost:4000/api'; // process.env.NEXT_PUBLIC_API_URL ||

export async function fetchApartments(page = 1, limit = 10): Promise<Apartment[]> {
  const res = await fetch(`${BASE_URL}/apartments?page=${page}&limit=${limit}`, {
    cache: 'no-store', // disables static caching -> always fetch fresh data
  });
  if (!res.ok) throw new Error('Failed to fetch apartments');
  return res.json();
}

export async function fetchApartment(id: string): Promise<Apartment> {
  const res = await fetch(`${BASE_URL}/apartments/${id}`, {
    cache: 'no-store',
  });

  console.log(res, 'responseeee');
  if (!res.ok) throw new Error('Apartment not found');
  return res.json();
}
