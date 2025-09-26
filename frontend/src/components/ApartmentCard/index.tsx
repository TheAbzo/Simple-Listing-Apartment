'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Apartment } from '../../types/apartment';
import styles from './ApartmentCard.module.scss';
import Image from 'next/image';

interface Props {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/apartments/${apartment.id}`);
  };
  return (
    <div className={styles.card} onClick={handleClick}>
      <Image src="/images/apartment.jpg" alt={apartment.unitName} width={400} height={180} />
      <div className={styles['card-content']}>
        <h2>{apartment.unitName}</h2>
        <p>{apartment.project?.name}</p>
        <p>
          {apartment.bedrooms} BR • {apartment.bathrooms} BA • {apartment.area} m²
        </p>
        <p className={styles.price}>${apartment.price} / mo</p>
        <Link href={`/apartments/${apartment.id}`} className={styles.link}>
          View Details →
        </Link>
      </div>
    </div>
  );
}
