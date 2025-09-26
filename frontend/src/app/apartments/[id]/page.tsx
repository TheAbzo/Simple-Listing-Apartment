import { fetchApartment } from "@/lib/api";
import { Apartment } from "@/types/apartment";
import styles from "./details.module.scss";

interface ApartmentPageProps {
  params: { id: string };
}

export default async function ApartmentDetails({ params }: ApartmentPageProps) {
  const apartment: Apartment = await fetchApartment(params.id);

  return (
    <div className={styles.container}>
      <h1>{apartment.unitName}</h1>
      <p>Project: {apartment.project?.name}</p>
      <p>Price: ${apartment.price}</p>
      <p>{apartment.bedrooms} Bedrooms</p>
      <p>{apartment.bathrooms} Bathrooms</p>
      <p>{apartment.area} sq.m</p>
      <p>{apartment.description}</p>
    </div>
  );
}
