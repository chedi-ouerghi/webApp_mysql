import React, { useEffect, useRef, useState } from "react";
import { createPage, deletePage, getpage, updatePage } from "../../api/apiPage";
import { getApplications } from "../../api/apiApplicarion";
import { getModules } from "../../api/apiModule";
import { Checkbox, Form, Modal, message } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Table from "./Table";
import Fonctionalite from "./Fonctionalite";
import Search from "antd/es/transfer/search";
import { GrAdd } from "react-icons/gr";
import ModalPage from "./ModalPage";

const Tpage = () => {

  const [page, setPage] = useState([]); 
  const [IdPage, setIdPage] = useState([]); 
    const [NomPage, setNomPage] = useState('');
  const [modules, setModules] = useState([]);
  const [IdModule, setIdModule] = useState([]);
    const [applications, setApplications] = useState([]); // Initialize the state for applications
  const [IdApplication, setIdApplication] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortAscending, setIsSortAscending] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const formRef = useRef(null);
  const [form] = Form.useForm(); // Add this line to create a form instance
    const { confirm } = Modal;

      // get all pages and modules and applications
      useEffect(() => {
    const fetchData = async () => {
      const pageData = await getpage();
      setPage(pageData);
    //   console.log(pageData,'tttt');
              const modulesData = await getModules();
      setModules(modulesData);
    //   console.log(modulesData);

      const applicationsData = await getApplications();
      setApplications(applicationsData);
      // console.log(applicationsData);
            // setRowCount(pageData.length);
    };
    fetchData();
      }, [page]);
  
     // double click to open modal edit
  const handleRowDoubleClick = (record) => {
  console.log('handleEdit called', record);
    setSelectedPage(record);
    setIdPage(record.IdPage);
    setIdApplication(record.IdApplication);
    setIdModule(record.IdModule);
    // message.info(record.IdApplication)
    // message.info(record.IdModule)
  setNomPage(record.NomPage);
    // setNomPage(record.NomPage);
    setIsModalOpen(true);
};
      // ::::::::::::::
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (record) => {
    setSelectedRowData(record);
    console.log(record.IdPage,record.IdApplication,record.IdModule);
    
  }; 
 const handleCreateClick = () => {
    setSelectedPage(null);
    setNomPage('');
    setIsModalOpen(true);
  };

const handleCreateModule = () => {
  if (!IdApplication || !IdModule || !NomPage) {
    message.error('Veuillez remplir les champs obligatoires');
    return;
  }

  createPage({
    IdApplication: IdApplication,
    IdModule:IdModule,
    NomPage: NomPage,
  })
    .then((newPage) => {
      setModules([...page, newPage]);
      message.success('Module a été créée avec succès.');
      setSelectedPage(null);
      formRef.current.resetFields(); // reset the form fields
      setIdApplication('');
    })
    .catch(error => {
      message.error(`La création de module a échoué. Erreur: ${error.message}`);
    });
};


const handleupdatePage = () => {
  if (selectedPage && selectedPage.IdPage === IdPage) {
    updatePage(selectedPage.IdPage, {
      NomPage: NomPage,
    })
      .then(() => {
        setModules(
          modules.map(module => {
            if (module.IdPage === selectedPage.IdPage) {
              return { ...selectedPage, NomPage: NomPage };
            } else {
              return module;
            }
          })
        );
        message.success('Màj. succès.');
        setIsModalOpen(false);
        setSelectedPage(null);
        setIdApplication('');
      })
      .catch(error => {
        console.error(error);
        message.error('Màj. échoué.');
      });
  } else {
    message.error('Erueur Màj.');
  }
  };


    // ::::::::::::::::::
const handleModalSubmit = async () => {
  if (!selectedPage) {
    handleCreateModule();
    return;
  }
  
  console.log('id:', selectedPage.IdPage, IdApplication);
  // console.log('data:', CodeModule, NomPage, IdApplication);

  // Call the API to update the module
  try {
    const data = {
      // CodeModule: CodeModule,
      NomPage: NomPage,
      IdApplication: IdApplication
    };
    const response = await updatePage(selectedPage.IdPage, data);
    console.log(response);
    setIsModalOpen(false);
    message.success('Module mis à jour avec succès!');
  } catch (error) {
    console.error(error);
    message.error('Erreur lors de la mise à jour du module');
  }
  };
  
  const handleEdit = (rowData) => {
  // console.log('handleEdit called', rowData);
  if (rowData) {
    setIdApplication(rowData.IdApplication)
    setIdModule(rowData.IdModule); 
    setNomPage(rowData.NomPage);
    // setNomApp(rowData.NomApplication);
  }
  setSelectedPage(rowData);
  setIsModalOpen(true);
  };
  
  // fonction delete with confirmation
const handleDelete = (id) => {
  if (id) {
    deletePage(id)
      .then(() => {
        setPage(page.filter(pages => pages.IdPage !== id));
        message.success('Suppression du page réussie.');
      })
      .catch(error => {
        message.error('la suppression du page a echoué');
      });
  } else {
    deletePage(selectedRows)
      .then(() => {
        setPage(page.filter(pages => !selectedRows.includes(pages.IdPage)));
        setSelectedRows([]);
        message.success('Suppression du page réussie.');
      })
      .catch(error => {
        message.error('la suppression du page a echoué.');
      });
  }
};

    // handle delete click inside table
const handleTableDeleteClick = (id) => {
  confirm({
    title: 'Voulez-vous supprimer la ligne?',
    icon: <ExclamationCircleOutlined />,
    cancelText: 'non',
    okText: 'oui',    
    okType: 'danger',
    onOk() {
      handleDelete(id);
    },
    onCancel() {},
  });
  };
  // handle delete click outside table
const handleOutsideDeleteClick = () => {
  confirm({
    title: 'Voulez-vous supprimer la ligne?',
    icon: <ExclamationCircleOutlined />,
    cancelText: 'non', 
    okText: 'oui',    
    okType: 'danger',
    onOk() {
      handleDelete();
    },
    onCancel() {},
  });
  };
    // ::::::::::::::::

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
const [filteredModules, setFilteredModules] = useState([]);
      const [isDataAvailable, setIsDataAvailable] = useState(true);

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
    <div className='container_user'>
      <div className="header_bar">
      <h2 style={{color:"white",display:'flex',justifyContent:"center",fontSize:"x-large",margin:'0% 1.5%'}}>
   Liste des Pages
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
      <Table
        page={page}
        IdPage={IdPage}
        IdModule={IdModule}
        IdApplication={IdApplication}        
          setSelectedPage={setSelectedPage}
          setIsModalOpen={setIsModalOpen}
          handleRowDoubleClick={handleRowDoubleClick}
        handleRowClick={handleRowClick}
        handleCheckboxChange={handleCheckboxChange}
        handleDelete={handleDelete}
        confirm={confirm}
        /> 
      <ModalPage
  isModalOpen={isModalOpen}
  handleModalSubmit={handleModalSubmit}
  selectedPage={selectedPage}
  setIsModalOpen={setIsModalOpen}
  NomPage={NomPage}
  IdApplication={IdApplication}
  IdModule={IdModule}
/>

      </div>
    )
};

export default Tpage;
