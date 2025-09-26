"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { useApartments } from "../hooks/useApartments";
import ApartmentCard from "../components/ApartmentCard";
import SearchBar from "../components/SearchBar";
import AddApartmentModal from "../components/AddApartmentModal";
import styles from "./index.module.scss";

export default function Home() {
  const { apartments, fetchMore, hasMore, setSearch, setApartments, setPage } = useApartments(10);

  const handleAdd = (newApartment: typeof apartments[0]) => {
     setApartments((prev) => [newApartment, ...prev]);
     setPage(1); 
  };

  return (
    <div className={styles.container}>
      <h1>Apartments</h1>

      <AddApartmentModal onAdded={handleAdd} />

      <SearchBar onSearch={(q) => setSearch(q)} />

      <InfiniteScroll
        dataLength={apartments.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more apartments</p>}
      >
        <div className={styles.grid}>
          {apartments.map((a) => (
            <ApartmentCard key={a.id} apartment={a} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
