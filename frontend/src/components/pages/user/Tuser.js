import React, { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getUser } from "../../api/apiUser";
import { getpage } from "../../api/apiPage";
import { getModules } from "../../api/apiModule";
import { getApplications } from "../../api/apiApplicarion";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import Search from "antd/es/transfer/search";
import { Form, Pagination } from "antd";
import SearchBar from "./SearchBar";

const Tuser = () => {
  const [user, setUser] = useState([]); 
    const [IdUser, setIdUser] = useState([]); 
    const [page, setPage] = useState([]); 
  const [applications, setApplications] = useState([]);
    const [IdApplication, setIdApplication] = useState('');
  const [modules, setModules] = useState([]);
  const [IdPage, setIdPage] = useState([]); 
  const [IdModule, setIdModule] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // get all pages and modules and applications
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      setUser(userData);
      const pageData = await getpage();
      setPage(pageData);
      const modulesData = await getModules();
      setModules(modulesData);
      const applicationsData = await getApplications();
      setApplications(applicationsData);
                  setRowCount(userData.length);
      

    };
    fetchData();
  }, [user]);

// double click to open modal edit
  const handleRowDoubleClick = (record) => {
    console.log('handleEdit called', record);
    setSelectedUser(record);
    setIdPage(record.IdPage);
    setIdApplication(record.IdApplication);
    setIdModule(record.IdModule);
    // setNomPage(record.NomPage);
    setIsModalOpen(true);
  };
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (record) => {
    setSelectedRowData(record);
    console.log(record.IdUser,record.IdPage,record.IdApplication,record.IdModule);
  }; 

  const handleCheckboxChange = (id, checked) => {
  console.log(`Checkbox with id ${id} is ${checked ? 'checked' : 'unchecked'}.`);
  setSelectedRows(rows => {
    if (checked) {
      return [...rows, id];
    } else {
      return rows.filter(row => row !== id);
    }
  });
};

    const [searchQuery, setSearchQuery] = useState('');
const [filteredUser, setFilteredUser] = useState([]);
      const [isDataAvailable, setIsDataAvailable] = useState(true);

useEffect(() => {
  if (!searchQuery) {
    setFilteredUser(user);
    setIsDataAvailable(true);
  } else {
    const filteredData = user.filter(
      (users) =>
        users.NomUser.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUser(filteredData);
    setIsDataAvailable(filteredData.length > 0);
  }
}, [user, searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
        
  };

  const [isSortAscending, setIsSortAscending] = useState(true);

  const handleSort = (column) => {
    setIsSortAscending(!isSortAscending);
  };



  const [currentUser, setCurrentUser] = useState(1);

  // pagination
  const PAGE_SIZE = 5;
  const indexOfLastPage = currentUser * PAGE_SIZE;
  const indexOfFirstPage = indexOfLastPage - PAGE_SIZE;
  const currentPages = filteredUser.slice(indexOfFirstPage, indexOfLastPage);

const pageCount = Math.ceil(filteredUser.length / PAGE_SIZE);

  const renderPageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    renderPageNumbers.push(
      <li
        key={i}
        style={{
          display: 'inline-block',
          margin: '0 5px',
          color: currentUser === i ? 'red' : 'blue',
          cursor: 'pointer',
        }}
        onClick={() => setCurrentUser(i)}
      >
        {i}
      </li>
    );
  }
   const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  // ... fonction to calculate currentPage and renderPageNumbers
        const [totalRowCount, setTotalRowCount] = useState(0);
    const [rowCount, setRowCount] = useState(0);

  const handleRowCount = () => {
    setTotalRowCount(filteredUser.length);
  };

  return(
      <div className='container_user'>
  <div className="header_bar">
      <h2 style={{color:"white",display:'flex',justifyContent:"center",fontSize:"x-large",margin:'0% 1.5%'}}>
   Liste des Users
        </h2>
        </div>
      <div className='actions_bar'>
          <div style={{ display: 'flex', gap: '10%', width: '40%', alignItems: "center" }}>
         
          {/* searche barre */}
<SearchBar handleSearch={handleSearch} />
          
        </div>
          <div className='btn_edit_delete'>
        <span
            className='btn_nov'
            title="Nouveau"
            // onClick={handleCreateClick}
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
  // onClick={() => handleEdit(selectedRowData)} 
  title="modifier"
  icon={<EditOutlined style={{ color: 'black' }} />}
  disabled={selectedRows.length !== 1}
>
  Modifier
</span>
          <span
            className='btn_sup'
            style={{ width: '50%', color: 'black', fontWeight: '500', fontSize: 'smaller' }}
            danger={true.toString()}
            title="Supprimer"
            disabled={selectedRows.length !== 1}
            // onClick={handleOutsideDeleteClick}
            icon={<DeleteOutlined />}
          >
            Supprimer
          </span>
        </>
          )}
        </div>
      </div>
  
      <TableUser filteredUser={filteredUser} selectedRows={selectedRows} handleSort={handleSort}
        handleCheckboxChange={handleCheckboxChange} 
  handleRowDoubleClick={handleRowDoubleClick}
  handleRowClick={handleRowClick}
 />
          <div className="footer_table"
          style={{
            display: 'flex', justifyContent: 'space-between'
            ,width:'100%'
            // , position: 'fixed', width: '92%', top: '89%'
          }}>
       <div className="pagination" style={{color:'black'}}>
          <Pagination
            simple
      current={currentUser}
            pageSize={PAGE_SIZE}
      total={filteredUser.length}
      onChange={setCurrentUser}
    />
        </div>
         <p style={{ color: 'black', width: '9.5%',float:'right',margin:'1% 0%' }}>
            NbrLig :
            <span
              // style={{ border: '2px solid blue', margin: '0% 2%' }}
            >
            {rowCount}
          </span>
          </p>
          </div>
      
      </div>
  )
};

export default Tuser;
