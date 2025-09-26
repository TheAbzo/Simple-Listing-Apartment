import { fetchApartment } from "@/lib/api";
import { Apartment } from "@/types/apartment";
import Image from "next/image";
import styles from "./details.module.scss";
import BackButton from "@/components/BackComponent";

interface ApartmentPageProps {
  params: { id: string };
}

export default async function ApartmentDetails({ params }: ApartmentPageProps) {
  const apartment: Apartment = await fetchApartment(params.id);

  const plural = (count: number, singular: string, plural?: string) =>
    count === 1 ? singular : plural || singular + "s";

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image
          src={"/images/apartment.jpg"}
          alt={apartment.unitName}
          width={320} // slightly bigger
          height={320}
          className={styles.image}
        />
      </div>

      <div className={styles.right}>
        <h1>{apartment.unitName}</h1>
        <p className={styles.unitNumber}>Unit Number: {apartment.unitNumber}</p>
        <p className={styles.project}>Project: {apartment.project?.name}</p>
        <p className={styles.price}>${apartment.price} / mo</p>

        <div className={styles.details}>
          <span>
            {apartment.bedrooms} {plural(apartment.bedrooms, "Bedroom")}
          </span>
          <span>
            {apartment.bathrooms} {plural(apartment.bathrooms, "Bathroom")}
          </span>
          <span>Area: {apartment.area} m²</span>
        </div>

        {apartment.description && (
          <p className={styles.description}>{apartment.description}</p>
        )}

       <BackButton className={styles.backButton} />
      </div>
    </div>
  );
}
