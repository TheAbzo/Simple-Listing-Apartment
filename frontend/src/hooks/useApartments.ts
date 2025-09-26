"use client";

import { useState, useEffect } from 'react';
import { getApartments } from '../services/apartment.service';
import { Apartment } from '../types/apartment';

export const useApartments = (limit = 10) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const data = await getApartments(page, limit);
    setApartments(prev => [...prev, ...data.data]);
    setPage(prev => prev + 1);

    if (apartments.length + data.data.length >= data.total) {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMore();
  }, []);

  return { apartments, fetchMore, hasMore, loading };
};
