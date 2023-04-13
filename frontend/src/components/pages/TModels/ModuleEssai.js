import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, Empty, Form, Input, message, Modal, Pagination, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { MdEditDocument, MdCreateNewFolder } from 'react-icons/md';
import { GrAdd, GrLinkNext,GrLinkPrevious } from "react-icons/gr";
import { getApplications } from "../../api/apiApplicarion";
import { createModule, deleteModule, getModules, updateModule } from "../../api/apiModule";
import './module.css';
import Search from "antd/es/transfer/search";

const ModuleEssai = () => {
  const [modules, setModules] = useState([]);
const [selectedModule, setSelectedModule] = useState(null);
const [applications, setApplications] = useState([]); // Initialize the state for applications
  const [IdApplication, setIdApplication] = useState('');
  const [IdModule, setIdModule] = useState([]);
const [CodeModule, setCodeModule] = useState('');
const [NomModule, setNomModule] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);
const [isSortAscending, setIsSortAscending] = useState(true);
  const formRef = useRef(null);
  const [form] = Form.useForm(); // Add this line to create a form instance
const { confirm } = Modal;
const [selectedRows, setSelectedRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);

  // get all modules and applications
      useEffect(() => {
    const fetchData = async () => {
      const modulesData = await getModules();
      setModules(modulesData);
      // console.log(modulesData,'tttt');
      const applicationsData = await getApplications();
      setApplications(applicationsData);
      // console.log(applicationsData);
            setRowCount(modulesData.length);
    };
    fetchData();
      }, [modules]);

  
    useEffect(() => {
    setRowCount(modules.length);
  }, [modules]);

  
  // useEffect(() => {
  //   setFilteredModules(modules);
  //   console.log(filteredModules);
    
  // }, [modules]);

    // ::::::::::::::::::
  
    const [NomApp, setNomApp] = useState(String);

    // double click to open modal edit
  const handleRowDoubleClick = (record) => {
  console.log('handleEdit called', record);
    setSelectedModule(record);
    setIdApplication(record.IdApplication);
    setIdModule(record.IdModule);
    setNomApp(record.NomApplication);
    // message.info(record.IdApplication)
    // message.info(record.IdModule)
  setCodeModule(record.CodeModule);
    setNomModule(record.NomModule);
    setIsModalOpen(true);
          setSelectedRow((selectedRow === record.IdModule) ? null : record.IdModule);

};

  
const handleCreateClick = () => {
    setSelectedModule(null);
    setCodeModule('');
    setNomModule('');
    setIsModalOpen(true);
  };

const handleCreateModule = () => {
  if (!IdApplication) {
    message.error('Veuillez selectionner le" Nom application"');
    return;
  }
 
  if (!CodeModule) {
message.error('Veuillez remplir le champ "Code module"');
return;
}

if (!NomModule) {
message.error('Veuillez remplir le champ "Nom module"');
return;
}
  createModule({
    IdApplication: IdApplication,
    CodeModule: CodeModule,
    NomModule: NomModule,
  })
    .then((newModule) => {
      setModules([...modules, newModule]);
        message.success('Création. succès.');
      setSelectedModule(null);
      formRef.current.resetFields(); // reset the form fields
      setIdApplication('');
      setCodeModule('');
      setNomModule('');
    })
    .catch(error => {
      message.error(`Création. échoué`);
    });
};
    // ::::::::::::::::::
const handleModalSubmit = async () => {
  if (!selectedModule) {
    handleCreateModule();
    return;
  }
  
  console.log('id:', selectedModule.IdModule, IdApplication);
  console.log('data:', CodeModule, NomModule, IdApplication);

  // Call the API to update the module
  try {
    const data = {
      CodeModule: CodeModule,
      NomModule: NomModule,
      IdApplication: IdApplication
    };
    if (!NomModule) {
message.error('Veuillez remplir le champ "Nom module"');
return;
}
    const response = await updateModule(selectedModule.IdModule, data);
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
    setCodeModule(rowData.CodeModule);
    setNomModule(rowData.NomModule);
    setIdModule(rowData.IdModule); 
    setNomApp(rowData.NomApplication);
  }
  setSelectedModule(rowData);
  setIsModalOpen(true);
};
  // fonction delete with confirmation
const handleDelete = (id) => {
  if (id) {
    deleteModule(id)
      .then(() => {
        setApplications(modules.filter(module => module.IdModule !== id));
        message.success('Suppression.réussie.');
      })
      .catch(error => {
        message.error('Suppression.échoué.');
      });
  } else {
    deleteModule(selectedRows)
      .then(() => {
        setApplications(modules.filter(module => !selectedRows.includes(module.IdModule)));
        setSelectedRows([]);
        message.success('Suppression.réussie.');
      })
      .catch(error => {
        message.error('Suppression.échoué.');
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

  const [selectedRow, setSelectedRow] = useState(null);
  
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
  
  const [isDataAvailable, setIsDataAvailable] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
const [filteredModules, setFilteredModules] = useState([]);

useEffect(() => {
  if (!searchQuery) {
    setFilteredModules(modules);
    setIsDataAvailable(true);
  } else {
    const filteredData = modules.filter(
      (module) =>
        module.NomModule.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.NomApplication.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.CodeModule.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredModules(filteredData);
    setIsDataAvailable(filteredData.length > 0);
  }
}, [modules, searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
        
};
  // ::::::::::::::
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (record) => {
    setSelectedRowData(record);
    console.log(record.IdApplication,record.IdModule);
      setSelectedRow((selectedRow === record.IdModule) ? null : record.IdModule);
  }; 

  // columns of table
const columns = [
  // {
  //   title: '',
  //   key: 'select',
  //   render: (text, record) => (
  //     <Checkbox
  //       checked={selectedRows.includes(record.IdModule)}
  //     />
  //   ),
  // },
  //  {
  //    title: 'idApp',
  //        dataIndex: 'IdApplication' ,
  //   key: 'IdApplication',
  // },
  {
title: 'NomApplication',
    dataIndex: 'NomApplication' ,
key: 'NomApplication',
},
// {
// title: 'ID_Module',
// dataIndex: 'IdModule',
// key: 'IdModule',
// },
{
title: 'Code Module',
dataIndex: 'CodeModule',
  key: 'CodeModule',
},
{
title: 'Nom Module',
dataIndex: 'NomModule',
  key: 'NomModule',
sorter: (a, b) => a.NomModule.localeCompare(b.NomModule),
sortDirections: ['ascend', 'descend', 'ascend'],
},
  ];


  // pagination

  const PAGE_SIZE = 14;
  const [currentPage, setCurrentPage] = useState(1);

    const handleSort = (column) => {
    setIsSortAscending(!isSortAscending);
  };
  const indexOfLastModule = currentPage * PAGE_SIZE;
  const indexOfFirstModule = indexOfLastModule - PAGE_SIZE;
  const currentModules = filteredModules.slice(indexOfFirstModule, indexOfLastModule);

const pageCount = Math.ceil(filteredModules.length / PAGE_SIZE);

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
   Liste des Modules
        </h2>
      </div>
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

    <div className='table_container'>
    <table style={{ color: "black", borderCollapse: 'collapse', border: '2px solid black', width: '97%', margin: '0% 1.5%' }}>
  <thead style={{height:'45px'}}>
    <tr style={{ color: 'white', backgroundColor: '#2e445a' }}>
      {columns.map((column) => (
        <th key={column.key} onClick={() => column.sorter && handleSort(column)} style={{ border: '2px solid black', backgroundColor: '#2e445a',fontWeight:'400' }}>
          {column.title}
        </th>
      ))}
      <th style={{ border: '2px solid black', backgroundColor: '#2e445a',fontWeight:'400' }}>Action</th>
    </tr>
  </thead>
  <tbody >
    {currentModules.map((module) => (
      <tr className='body_table' key={module.IdModule}
        onClick={() => { handleRowClick(module) }}
        onDoubleClick={() => handleRowDoubleClick(module)} 
        style={{
          border: '2px solid gray', height: '10px',
                     backgroundColor: module.IdModule === selectedRow ? '#add8e6' : ''

        }}>
        {/* <td
          style={{ width:'3px', color: 'black',  display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'smaller',margin:'0% 33%' }}
        > */}
          {/* <Checkbox title="cocher la case "
            onChange={(event) => handleCheckboxChange(module.IdModule, event.target.checked)}
                          checked={module.IdModule === selectedRow}

          /> */}
        {/* </td> */}
        {/* <td style={{
          color: 'black', border: '2px solid gray', fontSize: 'smaller', height: '30px'
        }}>{module.IdApplication}</td> */}
        <td style={{
          color: 'black', border: '2px solid gray', fontSize: 'smaller', height: '30px',width:'15%'
        }}>{module.NomApplication}</td>
        {/* <td style={{
          color: 'black', border: '2px solid gray', fontSize: 'smaller', height: '30px'
        }}>{module.IdModule}</td> */}
        <td style={{
          color: 'black', border: '2px solid gray', fontSize: 'smaller', height: '30px'
          , width: '15%'
        }}>{module.CodeModule}</td>
        <td style={{
          color: 'black', border: '2px solid gray', fontSize: 'smaller', height: '30px'
        }}>{module.NomModule}</td>
        <td style={{
          color: 'black', border: '2px solid gray', width: '5%', fontSize: 'smaller', height: '30px'
        }}>
          <div style={{
            display: 'flex', gap: '20%', justifyContent: 'center'
          }}>
             <span title="Modifier " onClick={() => handleEdit(module)} > <EditOutlined /></span>
                <span title="Supprimer " onClick={() => handleTableDeleteClick(module.IdModule)}  ><DeleteOutlined /></span>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

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
      total={filteredModules.length}
      onChange={setCurrentPage}
    />
        </div>
        <p style={{ color: 'black', width: '9.5%',float:'right',margin:'1% 0%' }}>
            NbrLig:
            <span
              // style={{ border: '2px solid blue', margin: '0% 2%' }}
            >
            {rowCount}
          </span>
          </p>
          </div>
      </div>
      

<Modal
  title={
    <div style={{ color: 'darkblue' }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span>{selectedModule ? 'Saisie Module' : 'Saisie Module'}</span>
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
    initialValues={{
      IdApplication: selectedModule?.IdApplication,
      CodeModule: selectedModule?.CodeModule,
      NomModule: selectedModule?.NomModule
    }}
  >
    <Form.Item
      label={<span style={{ color: 'black' }}>Nom Application</span>}
      name="IdApplication"
            rules={[
              { required: !selectedModule, message: "L'identifiant du module est obligatoire." }]}
    >
      <Select
        showSearch
        placeholder="Sélectionner une application"
        optionFilterProp="items"
        placement="bottom"
        filterOption={(input, option) =>
          option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={value => setIdApplication(value)}
        disabled={selectedModule !== null}
        style={{
          background: 'azur',
          color: 'black',
          fontWeight: '500'
        }}
      >
        {applications.map(application => (
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
      label={<span style={{ color: 'black' }}>Code Module</span>}
      name="CodeModule"
      rules={[        {          required: true,          message: 'Saisir le code du module.'        }      ]}
    >
      <Input
        autoComplete="off"
        disabled={selectedModule !== null}
        style={{
          background: '#d7d7ef',
          color: 'black'
        }}
        value={CodeModule}
        onChange={e => setCodeModule(e.target.value)}
      />
    </Form.Item>

    <Form.Item
      label={<span style={{ color: 'black' }}>Nom Module</span>}
      name="NomModule"
      rules={[        {          required: true,          message: 'Saisir le nom du module.'        }      ]}
    >
      <Input
        placeholder="Saisir le nom du module"
        autoComplete="off"
        value={NomModule}
        onChange={e => setNomModule(e.target.value)}
      />
    </Form.Item>
  </Form>
</Modal>

        </div>
        
    )
};
export default ModuleEssai;