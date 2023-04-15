import React, { useEffect, useRef, useState } from "react";
import TableUser from "./TableUser";
import { createUser, deleteUser, getUser, updateUser } from "../../api/apiUser";
import { getpage } from "../../api/apiPage";
import { getModules } from "../../api/apiModule";
import { getApplications } from "../../api/apiApplicarion";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import { MdCreateNewFolder, MdEditDocument } from "react-icons/md";
import { Form, Input, Modal, Pagination, Select, message } from "antd";
import SearchBar from "./SearchBar";
import ModalUser from "./ModalUser";

const Tuser = () => {
  const [user, setUser] = useState([]); 
  const [IdUser, setIdUser] = useState([]);
  const [NomUser, setNomUser] = useState();
  const [PrenomUser, setPrenomUser] = useState();
  const [Email, setEmail] = useState();
  const [Photo, setPhoto] = useState();
  const [Role, setRole] = useState();
    const [page, setPage] = useState([]); 
  const [applications, setApplications] = useState([]);
    const [IdApplication, setIdApplication] = useState('');
  const [modules, setModules] = useState([]);
  const [IdPage, setIdPage] = useState([]); 
  const [IdModule, setIdModule] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);
  const [form] = Form.useForm(); // Add this line to create a form instance
  const { confirm } = Modal;

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
 setIdUser(record.IdUser);
    setNomUser(record.NomUser);
   setPrenomUser(record.PrenomUser);
   setEmail(record.Email);
   setPhoto(record.Photo);
    setRole(record.Role);
    setIsModalOpen(true);
  };
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (record) => {
    setSelectedRowData(record);
    console.log(record.IdUser,record.IdPage,record.IdApplication,record.IdModule);
            setSelectedRow((selectedRow === record.IdPage) ? null : record.IdPage);
  }; 

 const handleCreateClick = () => {
    setSelectedUser(null);
    setIdApplication('');
    setIdModule('');
   setNomUser('');
   setPrenomUser('');
   setEmail('');
   setPhoto('');
   setRole('');
   setIsModalOpen(true);
  };

const handleCreatePage = () => {
  if (!IdApplication) {
    message.error('Veuillez selectionner le" Nom application"');
    return;
  }
  if (!IdModule) {
    message.error('Veuillez selectionner le" Nom Module"');
    return;
  }
  if (!IdPage) {
message.error('Veuillez remplir le champ "Nom Page"');
return;
  }
    if (!NomUser) {
message.error('Veuillez remplir le champ "Nom user"');
return;
    }
        if (!PrenomUser) {
message.error('Veuillez remplir le champ "Prenom user"');
return;
    }
        if (!Email) {
message.error('Veuillez remplir le champ "Email"');
return;
    }
        if (!Photo) {
message.error('Veuillez remplir le champ "Photo"');
return;
    }
        if (!Role) {
message.error('Veuillez remplir le champ "Role"');
return;
}
  createUser({
    IdApplication: IdApplication,
    IdModule: IdModule,
    IdPage:IdPage,
    NomUser: NomUser,
    PrenomUser: PrenomUser,
    Email: Email,
    Photo: Photo,
    Role:Role
  })
    .then((newPage) => {
      setPage([...page, newPage]);
        message.success('Création. succès.');
      setSelectedUser(null);
      formRef.current.resetFields();
      setIdApplication('');
    })
    .catch((error) => {
      message.error(`Création. échoué`);
    });
};
    // ::::::::::::::::::
const handleModalSubmit = async () => {
  if (!selectedUser) {
    handleCreatePage();
    return;
  }

  console.log('id:', selectedUser.IdUser, IdApplication,IdPage,IdModule);
  console.log('data:', IdPage, NomUser, PrenomUser,Email,Photo,Role);

  try {
    // Fetch applications
    await fetchApplications();

    // Fetch modules for the selected application
    if (IdApplication) {
      await fetchModules(IdApplication);
    }
    if (IdModule) {
      await fetchPages(IdModule);
    }
    
    // Call the API to update the page
    const data = {
      IdApplication: IdApplication,
      IdModule: IdModule,
      IdPage:IdPage,
         NomUser: NomUser,
    PrenomUser: PrenomUser,
    Email: Email,
      Photo: Photo,
        Role:Role
    };
     if (!NomUser) {
message.error('Veuillez remplir le champ "Nom user"');
return;
    }
        if (!PrenomUser) {
message.error('Veuillez remplir le champ "Prenom user"');
return;
    }
        if (!Email) {
message.error('Veuillez remplir le champ "Email"');
return;
    }
        if (!Photo) {
message.error('Veuillez remplir le champ "Photo"');
return;
    }
        if (!Role) {
message.error('Veuillez remplir le champ "Role"');
return;
}
    const response = await updateUser(selectedUser.IdUser, data);
    console.log(response);
    setIsModalOpen(false);
    message.success('Màj. succès.');
  } catch (error) {
    console.error(error);
    message.error('Erueur Màj.');
  }
};

  const handleEdit = (rowData) => {
    console.log('handleEdit called', rowData);
    if (rowData) {
      setIdUser(rowData.IdUser);
      setIdApplication(rowData.IdApplication)
      setIdModule(rowData.IdModule);
            setIdPage(rowData.IdPage);
    setNomUser(rowData.NomUser);
   setPrenomUser(rowData.PrenomUser);
   setEmail(rowData.Email);
   setPhoto(rowData.Photo);
    setRole(rowData.Role);
    setIsModalOpen(true);
     }
  setSelectedUser(rowData);
  setIsModalOpen(true);
  };

  // fonction delete with confirmation
const handleDelete = (id) => {
  if (id) {
    deleteUser(id)
      .then(() => {
        setPage(page.filter(pages => pages.IdPage !== id));
        message.success('Suppression réussie.');
      })
      .catch(error => {
        message.error('Suppression échouée.');
      });
  } else {
    deleteUser(selectedRows)
      .then(() => {
        setPage(page.filter(pages => !selectedRows.includes(pages.IdPage)));
        setSelectedRows([]);
        message.success('Suppression réussie.');
      })
      .catch(error => {
        message.error('Suppression échouée.');
      });
  }
};

// handle delete click inside table
const handleTableDeleteClick = (id) => {
  confirm({
    title: 'Voulez-vous supprimer la ligne ?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Oui',
    cancelText: 'Non',
    okType: 'danger',
    cancelButtonProps: {
      style: { fontWeight: 'normal' }
    },
    okButtonProps: {
      style: { fontWeight: 'normal' }
    },
    onOk() {
      handleDelete(id);
    },
    onCancel() {},
  });
};

// handle delete click outside table
const handleOutsideDeleteClick = () => {
  confirm({
    title: 'Voulez-vous supprimer la ligne ?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Oui',
    cancelText: 'Non',
    okType: 'danger',
    cancelButtonProps: {
      style: { fontWeight: 'normal' }
    },
    okButtonProps: {
      style: { fontWeight: 'normal' }
    },
    onOk() {
      handleDelete();
    },
    onCancel() {},
  });
};

  
 const handleCheckboxChange = (id, checked) => {
  console.log(`Checkbox with id ${id} is ${checked ? 'checked' : 'unchecked'}.`);
  setSelectedRows((rows) => {
    if (checked) {
      // Uncheck the previously selected row
      if (selectedRow !== null && selectedRow !== id) {
        const updatedRows = rows.filter((row) => row !== selectedRow);
        // Uncheck the checkbox of the previously selected row
        const currentCheckbox = document.getElementById(selectedRow);
        if (currentCheckbox) {
          currentCheckbox.checked = false;
        }
        return [...updatedRows, id];
      } else {
        return [...rows, id];
      }
    } else {
      // Uncheck the selected row
      if (selectedRow === id) {
        setSelectedRow(null);
      }
      return rows.filter((row) => row !== id);
    }
  });
  setSelectedRow(checked ? id : null);
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

// pour la selecte fetch avec application
  const fetchApplications = async () => {
  try {
    const response = await getApplications();
    setApplications(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchModules = async (IdApplication) => {
  try {
    const response = await getModules(IdApplication);
    setModules(response.data);
  } catch (error) {
    console.error(error);
  }
  };
   const fetchPages = async (IdModule) => {
  try {
    const response = await getpage(IdModule);
    setPage(response.data);
  } catch (error) {
    console.error(error);
  }
  };
  const handleApplicationChange = (value) => {
  setIdApplication(value);
  setIdModule(null);
  setIdPage(null);
  const selectedApplication = applications.find(
    (application) => application.IdApplication === value
  );
  if (selectedApplication) {
    setModules(selectedApplication.Modules);
  } else {
    setModules([]);
  }
  setPage([]);
};



  const [currentUser, setCurrentUser] = useState(1);

  // pagination
  const PAGE_SIZE = 13;
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
            danger={true.toString()}
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
  
      <TableUser filteredUser={filteredUser} selectedRows={selectedRows} handleSort={handleSort}
        handleCheckboxChange={handleCheckboxChange} selectedRow={selectedRow}
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
      <ModalUser selectedUser={selectedUser} handleModalSubmit={handleModalSubmit} isModalOpen={isModalOpen}
        applications={applications} modules={modules} NomUser={NomUser} Email={Email} setIsModalOpen={setIsModalOpen}
        PrenomUser={PrenomUser} Photo={Photo} Role={Role} setIdApplication={setIdApplication} setIdPage={setIdPage}
        setIdModule={setIdModule} setPhoto={setPhoto} setPrenomUser={setPrenomUser} setRole={setRole}
        setEmail={setEmail} setNomUser={setNomUser} IdApplication={IdApplication} IdModule={IdModule} IdPage={IdPage} />
      </div>
  )
};

export default Tuser;
