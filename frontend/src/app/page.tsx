"use client";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useApartments } from '../hooks/useApartments';
import ApartmentCard from '../components/ApartmentCard';
import styles from './index.module.scss';

export default function Home() {
  const { apartments, fetchMore, hasMore } = useApartments(10);

  return (
    <div className={styles.container}>
      <h1>Apartments</h1>
      <InfiniteScroll
        dataLength={apartments.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more apartments</p>}
      >
        <div className={styles.grid}>
          {apartments.map(a => (
            <ApartmentCard key={a.id} apartment={a} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
