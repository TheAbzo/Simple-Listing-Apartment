"use client";

import { useState } from "react";
import { Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  onSearch: (query: string) => void; // Single search string
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState(""); 

  const handleSearch = () => {
    onSearch(query); 
  };

  return (
    <Space style={{ marginBottom: "1.5rem" }}>
      <Input
        placeholder="Search by name, unit number, or project..."
        prefix={<SearchOutlined />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onPressEnter={handleSearch}
        style={{ width: 300 }}
      />
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
    </Space>
  );
}
