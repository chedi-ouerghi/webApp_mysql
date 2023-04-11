import React, { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getUser } from "../../api/apiUser";
import { getpage } from "../../api/apiPage";
import { getModules } from "../../api/apiModule";
import { getApplications } from "../../api/apiApplicarion";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import Search from "antd/es/transfer/search";
import { Form } from "antd";

const Tuser = () => {
  const [user, setUser] = useState([]); 
    const [page, setPage] = useState([]); 
    const [applications, setApplications] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);


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
                  // setRowCount(userData.length);
      

    };
    fetchData();
  }, [user]);
  return(
      <div className='container_user'>
  <div className="header_bar">
      <h2 style={{color:"white",display:'flex',justifyContent:"center",fontSize:"x-large",margin:'0% 1.5%'}}>
   Liste des Users
        </h2>
        </div>
      <div className='actions_bar'>
          <div style={{ display: 'flex', gap: '10%', width: '40%', alignItems: "center" }}>
          <Form className="search_bar">
      <Search
            placeholder="Rechercher"
            title="Rechercher "
            prefix={<SearchOutlined /> }
            allowClear
        // onChange={(e) => handleSearch(e.target.value)}
      />
        </Form>
          
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
  <div>
    <TableUser user={user} />
      </div>
      </div>
  )
};

export default Tuser;
