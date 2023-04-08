import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";

const Fonctionalite = ({page,selectedRows,selectedRowData,handleEdit,handleCreateClick,handleOutsideDeleteClick}) => {
      const [isDataAvailable, setIsDataAvailable] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
const [filteredModules, setFilteredModules] = useState([]);

useEffect(() => {
  if (!searchQuery) {
    setFilteredModules(page);
    setIsDataAvailable(true);
  } else {
    const filteredData = page.filter(
      (pages) =>
        pages.NomModule.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredModules(filteredData);
    setIsDataAvailable(filteredData.length > 0);
  }
}, [page, searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
        
};
    return (
        <div>
              <div className='actions_bar'>
        <div style={{display:'flex',gap:'10%',width:'40%',alignItems:"center"}}>
          <Form className="search_bar">
      <Search
            placeholder="Rechercher"
            title="Rechercher "
            prefix={<SearchOutlined /> }
            allowClear
        onChange={(e) => handleSearch(e.target.value)}
      />
        </Form>
          
        </div>
          <div className='btn_edit_delete'>
        <span
            className='btn_nov'
            title="Nouveau"
            onClick={handleCreateClick}
            style={{ display: "flex", width: '100%', color: 'black', fontWeight: '500', fontSize: 'smaller' }}
          >
            <GrAdd style={{ display: 'flex', alignItems: 'center', height: "100%", margin: '0% 1%' }} />
            Nouveau
          </span>
        {selectedRows.length === 1 && (
        <>
       <span
  className='btn_mod'
  style={{ width: '50%', color: 'black', fontWeight: '500', fontSize: 'smaller' }}
  onClick={() => handleEdit(selectedRowData)} 
  title="modifier"
  icon={<EditOutlined style={{ color: 'black' }} />}
  disabled={selectedRows.length !== 1}
>
  Modifier
</span>
          <span
            className='btn_sup'
            style={{ width: '50%', color: 'black', fontWeight: '500', fontSize: 'smaller' }}
            danger
            title="Supprimer"
            disabled={selectedRows.length !== 1}
            onClick={handleOutsideDeleteClick}
            icon={<DeleteOutlined />}
          >
            Supprimer
          </span>
        </>
          )}
          </div>
          
    </div>

      
  </div>)
};

export default Fonctionalite;
