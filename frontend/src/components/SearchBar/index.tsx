'use client';

import { useState, useEffect } from 'react';
import { Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './searchBar.module.scss';

interface Props {
  onSearch: (query: string) => void;
  debounceTime?: number;
}

export default function SearchBar({ onSearch, debounceTime = 500 }: Props) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query.trim());
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, debounceTime, onSearch]);

  const handleSearchClick = () => {
    onSearch(query.trim());
  };

  return (
    <Space className={styles.searchForm}>
      <Input
        placeholder="Search by name, unit number, or project..."
        prefix={<SearchOutlined />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="primary" onClick={handleSearchClick}>
        Search
      </Button>
    </Space>
  );
}
