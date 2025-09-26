"use client";

import Link from 'next/link';
import { Apartment } from '../../types/apartment';
import styles from './ApartmentCard.module.scss';

interface Props {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: Props) {
  return (
    <div className={styles.card}>
      <h2>{apartment.unitName}</h2>
      <p>Project: {apartment.project?.name}</p>
      <p>Price: ${apartment.price}</p>
      <p>{apartment.bedrooms} BR • {apartment.bathrooms} BA • {apartment.area} m²</p>
      <Link href={`/apartments/${apartment.id}`} className={styles.link}>
        View Details →
      </Link>
    </div>
  );
}
