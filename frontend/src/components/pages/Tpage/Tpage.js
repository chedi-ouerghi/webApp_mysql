import React, { useEffect, useRef, useState } from "react";
import { createPage, deletePage, getpage, updatePage } from "../../api/apiPage";
import { getApplications } from "../../api/apiApplicarion";
import { getModules } from "../../api/apiModule";
import {  Empty, Form, Input, Pagination, Select, message } from "antd";
import Modal from "antd/es/modal";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Table from "./Table";
import { MdCreateNewFolder, MdEditDocument } from "react-icons/md";
import Search from "antd/es/transfer/search";
import { GrAdd } from "react-icons/gr";
// import ModalPage from "./ModalPage";
import './tpage.css'

const Tpage = () => {

  const [page, setPage] = useState([]); 
  const [IdPage, setIdPage] = useState([]); 
  const [NomPage, setNomPage] = useState('');
  const [modules, setModules] = useState([]);
  const [IdModule, setIdModule] = useState([]);
  const [applications, setApplications] = useState([]);
  const [IdApplication, setIdApplication] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortAscending, setIsSortAscending] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
    const [rowCount, setRowCount] = useState(0);
  const formRef = useRef(null);
  const [form] = Form.useForm(); // Add this line to create a form instance
  const { confirm } = Modal;

  // get all pages and modules and applications
  useEffect(() => {
    const fetchData = async () => {
      const pageData = await getpage();
      setPage(pageData);
      const modulesData = await getModules();
      setModules(modulesData);
      const applicationsData = await getApplications();
      setApplications(applicationsData);
                  setRowCount(pageData.length);

    };
    fetchData();
  }, [page]);
    // ::::::::::::::
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (record) => {
    if (selectedRow === record.IdPage) {
    setSelectedRow(null);
    setSelectedRowData(null);
  } else {
    setSelectedRow(record.IdPage);
    setSelectedRowData(record);
    }
    console.log(record.IdPage, record.IdApplication, record.IdModule);
          setSelectedRow((selectedRow === record.IdPage) ? null : record.IdPage);

  }; 

  const handleCreateClick = () => {
    setSelectedPage(null);
    setIdApplication('');
    setIdModule('');
    setNomPage('');
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
  if (!NomPage) {
message.error('Veuillez remplir le champ "Nom Page"');
return;
}
 createPage({
  IdApplication: IdApplication,
  IdModule: IdModule,
  NomPage: NomPage,
})
  .then((newPage) => {
    setPage([...page, newPage]);
    message.success('Création. succès.');
    setSelectedPage(null);
  formRef.current.setFieldsValue({
      IdApplication: '',
      IdModule: '',
      NomPage: '',
  });
    setIdApplication('');
  })
  .catch((error) => {
    message.error(`Création. échoué`);
  });
};
    // ::::::::::::::::::
const handleModalSubmit = async () => {
  if (!selectedPage) {
    handleCreatePage();
    return;
  }

  try {
    // Fetch applications
    await fetchApplications();

    // Fetch modules for the selected application
    if (IdApplication) {
      await fetchModules(IdApplication);
    }
    
    // Call the API to update the page
    const data = {
      IdApplication: IdApplication,
      IdModule: IdModule,
      NomPage: NomPage,
    };
    
    const response = await updatePage(selectedPage.IdPage, data);
    console.log(response);
    setIsModalOpen(false);
    message.success('Màj. succès.');
    formRef.current.resetFields(); // Réinitialise les champs du formulaire
  } catch (error) {
    console.error(error);
    message.error(error.response?.data?.error ||'Erueur Màj.');
  }
};
 
  // double click to open modal edit
  const handleRowDoubleClick = (record) => {
    console.log('handleEdit called', record);
    setSelectedPage(record);
    setIdPage(record.IdPage);
    setIdApplication(record.IdApplication);
    setIdModule(record.IdModule);
    setNomPage(record.NomPage);
    setIsModalOpen(true);
    setSelectedRow((selectedRow === record.IdPage) ? null : record.IdPage);

  };


  const handleEdit = (rowData) => {
    console.log('handleEdit called', rowData);
      if (selectedRowData) {
    if (rowData) {
      setIdPage(rowData.IdPage);
      setIdApplication(rowData.IdApplication)
      setIdModule(rowData.IdModule);
      setNomPage(rowData.NomPage);
      // setNomApp(rowData.NomApplication);
        setIsModalOpen(true);
     } else {
      message.info('Sélectionnez une ligne à modifier');
        }
          setSelectedPage(rowData);

         } else {
    message.info('Sélectionnez une ligne à modifier');
  }
  };
  
// fonction delete with confirmation
const handleDelete = (rowData) => {
   if (!rowData || !rowData.IdPage) {
    console.error('IdPage is missing in rowData:', rowData);
    return;
  }
  deletePage(rowData.IdPage)
    .then(() => {
      setModules(modules.filter(module => module.IdPage !== rowData.IdPage));
      setSelectedRows([]);
      setSelectedRowData(null);
      message.success('Suppression réussie.');
    })
    .catch(error => {
      message.error(error.response?.data?.error ||'Suppression échouée.');
    });
};

// handle delete click outside table
const handleOutsideDeleteClick = () => {
   if (!selectedRowData) {
    message.info('Sélectionnez une ligne à supprimer');
    return;
  }
  confirm({
    title: 'Voulez-vous supprimer la ligne?',
    icon: <ExclamationCircleOutlined />,
    cancelText: 'non', 
    okText: 'oui',    
    okType: 'danger',
    onOk() {
      if (selectedRowData) {
        handleDelete(selectedRowData);
      } else {
        console.error('Cannot delete undefined row data');
      }
    },
    onCancel() {},
  });
};

    // ::::::::::::::::

  const [currentPage, setCurrentPage] = useState(1);

    const handleSort = (column) => {
    setIsSortAscending(!isSortAscending);
  };

  const [searchQuery, setSearchQuery] = useState('');
const [filteredPage, setFilteredPage] = useState([]);
      const [isDataAvailable, setIsDataAvailable] = useState(true);

useEffect(() => {
  if (!searchQuery) {
    setFilteredPage(page);
    setIsDataAvailable(true);
  } else {
    const filteredData = page.filter(
      (pages) =>
        pages.NomPage.toLowerCase().includes(searchQuery.toLowerCase())||
     pages.NomModule.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pages.NomApplication.toLowerCase().includes(searchQuery.toLowerCase()) 
        // pages.CodeModule.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPage(filteredData);
    setIsDataAvailable(filteredData.length > 0);
  }
}, [page, searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
        
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
 
  
  
  // pagination
  const PAGE_SIZE = 13;
  const indexOfLastPage = currentPage * PAGE_SIZE;
  const indexOfFirstPage = indexOfLastPage - PAGE_SIZE;
  const currentPages = filteredPage.slice(indexOfFirstPage, indexOfLastPage);

const pageCount = Math.ceil(filteredPage.length / PAGE_SIZE);

  const renderPageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    renderPageNumbers.push(
      <li
        key={i}
        style={{
          display: 'inline-block',
          margin: '0 5px',
          color: currentPage === i ? 'red' : 'blue',
          cursor: 'pointer',
        }}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </li>
    );
  }
   const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }
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
       <span
  className='btn_mod'
  style={{ width: '50%', color: 'black', fontWeight: '500', fontSize: 'smaller' }}
  onClick={() => handleEdit(selectedRowData)} 
  title="modifier"
  icon={<EditOutlined style={{ color: 'black' }} />}
      disabled={!selectedRowData}
>
  Modifier
</span>
          <span
            className='btn_sup'
            style={{ width: '50%', color: 'black', fontWeight: '500', fontSize: 'smaller' }}
            danger={true.toString()}
            title="Supprimer"
            // disabled={selectedRows.length !== 1}
           onClick={() => handleOutsideDeleteClick(selectedRowData)}
            icon={<DeleteOutlined />}
          >
            Supprimer
          </span>
        </div>
      </div>
     <Table
  page={page}
  IdPage={IdPage}
  IdModule={IdModule}
  IdApplication={IdApplication}
  setSelectedPage={setSelectedPage}
  setIsModalOpen={setIsModalOpen}
  filteredPage={filteredPage} 
  handleRowDoubleClick={handleRowDoubleClick}
  handleRowClick={handleRowClick}
  handleDelete={handleDelete}
        confirm={confirm}
        selectedRow={selectedRow}
  handleEdit={handleEdit}
        handleSort={handleSort}
        currentPages={currentPages}
/>
                 {!isDataAvailable && <div
          style={{
            color: "black", display: 'flex', justifyContent: "center", alignItems: 'center', fontSize: 'xx-large', height: '430px',
    width:' 97%',
    margin: '0% 1.5%'
          }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              {/* <p>Aucune donnée trouvée.</p> */}
        </div>}
        <div className="footer_table"
          style={{
            display: 'flex', justifyContent: 'space-between'
            ,width:'100%'
            // , position: 'fixed', width: '92%', top: '89%'
          }}>
   <div className="pagination" style={{color:'black'}}>
          <Pagination
            simple
      current={currentPage}
            pageSize={PAGE_SIZE}
      total={filteredPage.length}
      onChange={setCurrentPage}
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
           
<Modal
  title={
    <div style={{ color: 'darkblue' }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {selectedPage ? (
          <MdEditDocument style={{ marginRight: '2%', color: 'black' }} />
        ) : (
          <MdCreateNewFolder style={{ marginRight: '2%', color: 'black' }} />
        )}
        <span>{selectedPage ? 'Saisie Page' : 'Saisie Page'}</span>
      </span>
    </div>
  }
  open={isModalOpen}
  onOk={handleModalSubmit}
  onCancel={() => setIsModalOpen(false)}
  okText="Enregistrer"
  cancelText="Fermer"
  destroyOnClose={true}
>
  <Form
    onFinish={handleModalSubmit}
    ref={formRef}
    layout="vertical"
    style={{
      marginBlock: '1%',
      border: '2px solid blue',
      padding: '10px',
      borderRadius: '10px'
    }}
    initialValues={{ NomPage: selectedPage?.NomPage || "" }}
  >
    <Form.Item
  label={<span style={{ color: 'black' }}>Nom Application</span>}
  name="IdApplication"
  initialValue={selectedPage?.IdApplication || IdApplication}
>
  <Select
    showSearch
    placeholder="Sélectionner une application"
    optionFilterProp="children"
    defaultValue={IdApplication || undefined} // ajout de defaultValue
    disabled={selectedPage !== null}
    placement="bottom"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    onChange={value => setIdApplication(value)}
  >
   {applications && applications.map(application => (
    <Select.Option
      key={application.IdApplication}
      value={application.IdApplication}
    >
      {application.NomApplication}
    </Select.Option>
   ))}
  </Select>
</Form.Item>

    <Form.Item
      label={<span style={{ color: 'black' }}>Nom Module</span>}
      name="IdModule"
      initialValue={selectedPage?.IdModule || IdModule}
    >
      <Select
        showSearch
        placeholder="Sélectionner un module"
              optionFilterProp="children"
                  defaultValue={IdModule || undefined} // ajout de defaultValue
        disabled={selectedPage !== null}
        placement="bottom"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={value => setIdModule(value)}
      >
      {modules && modules.filter(module => module.IdApplication === IdApplication).map(module => (
          <Select.Option
            key={module.IdModule}
            value={module.IdModule}
          >
            {module.NomModule}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item
      label={<span style={{ color: 'black' }}>Nom page</span>}
      name="NomPage"
      rules={[{ required: true, message: 'Le nom de la page est obligatoire' }]}
      initialValue={selectedPage?.NomPage || NomPage}
    >
      <Input
        placeholder="Saisir le nom de la page"
        autoComplete="off"
        onChange={e => setNomPage(e.target.value)}
      />
    </Form.Item>
  </Form>
</Modal>


      </div>
    )
};

export default Tpage;
