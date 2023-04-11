import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Search from "antd/es/transfer/search";

const SearchBar = ({handleSearch}) => {

  return (
    <Form className="search_bar">
      <Search
        placeholder="Rechercher"
        title="Rechercher "
        prefix={<SearchOutlined />}
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
      />
    </Form>
  );
};

export default SearchBar;
