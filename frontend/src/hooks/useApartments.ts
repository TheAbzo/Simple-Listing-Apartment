'use client';

import { useEffect, useState } from 'react';
import { getApartments } from '../services/apartment.service';
import { Apartment } from '../types/apartment';

export function useApartments(limit: number) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPage(1);
    fetchMore(true, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchMore = async (reset = false, pageToFetch?: number) => {
    const currentPage = pageToFetch ?? page;
    const data = await getApartments(currentPage, limit, search);

    if (reset) {
      setApartments(data.data);
      setPage(2);
    } else {
      setApartments((prev) => [...prev, ...data.data]);
      setPage((prev) => prev + 1);
    }

    setHasMore(data.data.length === limit);
  };

  return {
    apartments,
    fetchMore,
    hasMore,
    setSearch,
    setApartments,
    setPage,
  };
}
