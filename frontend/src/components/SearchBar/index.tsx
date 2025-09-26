"use client";

import { Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  onSearch: (query: string) => void; // Single search string
}

export default function SearchBar({ onSearch }: Props) {
  let query = "";

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Space style={{ marginBottom: "1.5rem" }}>
      <Input
        placeholder="Search by name, unit number, or project..."
        prefix={<SearchOutlined />}
        onChange={(e) => (query = e.target.value)}
        onPressEnter={handleSearch} 
        style={{ width: 300 }}
      />
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
    </Space>
  );
}
