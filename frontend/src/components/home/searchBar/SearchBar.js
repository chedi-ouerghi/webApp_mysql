import React from 'react';
import { Input } from 'antd';
import './searchbar.css';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = () => {
  return (
    <div className="search-bar">
      <Search   placeholder="Rechercher"
            title="Rechercher "
            prefix={<SearchOutlined /> }
              allowClear
          />
    </div>
  );
};

export default SearchBar;
