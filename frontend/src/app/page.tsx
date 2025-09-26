'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useApartments } from '../hooks/useApartments';
import ApartmentCard from '../components/ApartmentCard';
import SearchBar from '../components/SearchBar';
import AddApartmentModal from '../components/AddApartmentModal';
import styles from './index.module.scss';

export default function Home() {
  const { apartments, fetchMore, hasMore, setSearch, setApartments, setPage } = useApartments(10);

  const handleAdd = (newApartment: (typeof apartments)[0]) => {
    setApartments((prev) => [newApartment, ...prev]);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <h1>Apartments Listing</h1>

      <div className={styles.topRow}>
        <div className={styles.searchWrapper}>
          <SearchBar onSearch={(q) => setSearch(q)} />
        </div>

        <div className={styles.buttonWrapper}>
          <AddApartmentModal onAdded={handleAdd} />
        </div>
      </div>

      {apartments.length === 0 ? (
        <p className={styles.noApartments}>No apartments available</p>
      ) : (
        <InfiniteScroll
          dataLength={apartments.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          className={styles.infiniteScroll}
        >
          <div className={styles.grid}>
            {apartments.map((a, index) => (
              <ApartmentCard key={`${a.id}-${index}`} apartment={a} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
