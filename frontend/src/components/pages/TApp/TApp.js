
import React, { useState, useEffect, useRef } from 'react';
import { Input, message, Form,  Modal,  Empty,  Pagination } from 'antd';
import { createApplication, deleteApplication, getApplications, updateApplication } from '../../api/apiApplicarion';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import './tapp.css';
import Search from 'antd/es/transfer/search';

const TApp = () => {
  const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
  const [codeApplication, setCodeApplication] = useState('');
  const [nomApplication, setNomApplication] = useState('');
  const [isSortAscending, setIsSortAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
const formRef = useRef(null);
  const [rowCount, setRowCount] = useState(0);

useEffect(() => {
  const fetchData = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  fetchData();
}, []);

useEffect(() => {
  setRowCount(applications.length);
  setFilteredApplications(applications);
}, [applications]);
  

  
    const { confirm } = Modal ;

  // double click to open modal edit 
  const handleRowDoubleClick = (record) => {
  setSelectedApplication(record);
  setCodeApplication(record.CodeApplication);
  setNomApplication(record.NomApplication);
    setIsModalOpen(true);
      setSelectedRow((selectedRow === record.IdApplication) ? null : record.IdApplication);

};
  // ::::::::::::::::::
  const handleModalSubmit = () => {
  if (!codeApplication) {
message.error('Veuillez remplir le champ "Code application"');
return;
}

if (!nomApplication) {
message.error('Veuillez remplir le champ "Nom application"');
return;
}

  if (selectedApplication) {
    updateApplication(selectedApplication.IdApplication, {
      NomApplication: nomApplication,
    })
      .then(() => {
        setApplications(
          applications.map(application => {
            if (application.IdApplication === selectedApplication.IdApplication) {
              return { ...selectedApplication, NomApplication: nomApplication };
            } else {
              return application;
            }
          })
        );
        message.success('Màj. succès.');
        setIsModalOpen(false);
        setSelectedApplication(null);
        setCodeApplication('');
        setNomApplication('');
      })
      .catch(error => {
        message.error(error.response?.data?.error ||'Màj. échoué.');
      });
  } else {
    createApplication({
      CodeApplication: codeApplication,
      NomApplication: nomApplication,
    })
      .then((newApplication) => {
        setApplications([...applications, newApplication]);
        message.success('Création. succès.');
        setSelectedApplication(null);
        formRef.current.resetFields(); // reset the form fields
        setCodeApplication('');
        setNomApplication('');
      })
       .catch(error => {
        message.error(error.response?.data?.error ||`Création. échoué. Erreur: ${'le code de l\'application est unique'}`);
      });
  }
};
    // ::::::::::::::::::
const handleCreateClick = () => {
  setSelectedApplication(null);
  setCodeApplication('');
  setNomApplication('');
  setIsModalOpen(true);
};

  // ::::::::::::::::::
const handleEdit = (rowData) => {
  if (selectedRowData) {
    if (rowData) {
      setCodeApplication(rowData.CodeApplication);
      setNomApplication(rowData.NomApplication);
      setIsModalOpen(true);
    } else {
      message.info('Sélectionnez une ligne à modifier');
    }
    setSelectedApplication(rowData);
  } else {
    message.info('Sélectionnez une ligne à modifier');
  }
};

  // ::::::::::::::::::
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  // fonction delete with confirmation
const handleDelete = (rowData) => {
  if (!rowData || !rowData.IdApplication) {
    message.error("L'ID de l'application n'est pas défini.");
    return;
  }
  
  deleteApplication(rowData.IdApplication)
    .then(() => {
      setApplications(applications.filter(application => application.IdApplication !== rowData.IdApplication));
      setSelectedRows([]);
      setSelectedRowData(null);
            console.log('Suppression réussie.');
      message.success('Suppression réussie.');
    })
    .catch(error => {
      console.error(error);
      message.error(error.response?.data?.error || 'Suppression échouée.');
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
    okText: 'Oui',
    okType: 'danger',
    cancelText: 'Non',
    onOk() {
      handleDelete(selectedRowData); // pass rowData object instead of selectedRowData.IdApplication
    },
    onCancel() {},
  });
};



  const [filteredApplications, setFilteredApplications] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const handleSearch = (value) => {
    if (!value) {
      setFilteredApplications(applications);
    } else {
      const filteredData = applications.filter(
        (application) =>
          application.CodeApplication.toLowerCase().includes(value.toLowerCase()) ||
          application.NomApplication.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredApplications(filteredData);
      setIsDataAvailable(filteredData.length > 0);
    }
  };
  // ::::::::::::::
    const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (record) => {
  if (selectedRow === record.IdApplication) {
    setSelectedRow(null);
    setSelectedRowData(null);
  } else {
    setSelectedRow(record.IdApplication);
    setSelectedRowData(record);
    }
      message.info((selectedRow === record.IdApplication) ? null : record.IdApplication)

};

  const columns = [
    // {
    //   title: '',
    //   key: 'select',
    //   render: (text) => <Checkbox />,
    // },
    // {
    //   title: 'IDApplication',
    //   dataIndex: 'IdApplication',
    //   key: 'IdApplication',
    //   sorter: (a, b) => a.IdApplication - b.IdApplication,
    // },
    {
      title: 'Code Application',
      dataIndex: 'CodeApplication',
      // minWidth: '40',
      key: 'CodeApplication',
      sorter: (a, b) => {
        if (isSortAscending) {
          return a.CodeApplication.localeCompare(b.CodeApplication);
        } else {
          return b.CodeApplication.localeCompare(a.CodeApplication);
        }
      },
    },
    {
      title: 'Nom Application',
      dataIndex: 'NomApplication',
      key: 'NomApplication',
      sorter: (a, b) => {
        if (isSortAscending) {
          return a.NomApplication.localeCompare(b.NomApplication);
        } else {
          return b.NomApplication.localeCompare(a.NomApplication);
        }
      },
    },
     
  ];
  // pagination
  const PAGE_SIZE = 13;
  const [currentPage, setCurrentPage] = useState(1);
    const handleSort = (column) => {
    setIsSortAscending(!isSortAscending);
  };
  const indexOfLastApplication = currentPage * PAGE_SIZE;
  const indexOfFirstApplication = indexOfLastApplication - PAGE_SIZE;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const pageCount = Math.ceil(filteredApplications.length / PAGE_SIZE);
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
   Liste des Applications
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
       {/* <Link to='/home/page2'> */}
          <span
            className='btn_nov'
            title="Nouveau"
            onClick={handleCreateClick}
            style={{ display: "flex", width: '100%', color: 'black', fontWeight: '500', fontSize: 'smaller' }}
          >
            <GrAdd style={{ display: 'flex', alignItems: 'center', height: "100%", margin: '0% 1%' }} />
            Nouveau
            </span>
            {/* </Link> */}
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
            danger
            title="Supprimer"
            // disabled={selectedRow.length !== 1}
onClick={() => handleOutsideDeleteClick(selectedRowData)}
            icon={<DeleteOutlined />}
          >
            Supprimer
          </span>
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
    {/* <th style={{ border: '2px solid black', backgroundColor: '#2e445a',fontWeight:'400' }}>Action</th> */}
  </tr>
</thead>
      <tbody >
        {currentApplications.map((application) => (
          <tr className='body_table' key={application.IdApplication}
            onClick={() => { handleRowClick(application) }}
            onDoubleClick={() => handleRowDoubleClick(application)}
            
            style={{
              border: '2px solid gray', height: '10px',
             backgroundColor: application.IdApplication === selectedRow ? '#add8e6' : ''
            }}>
            {/* <td
              style={{width:'6px', color: 'black',  display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'smaller',margin:'0% 33%'  }}
            > */}
              {/* <Checkbox
                title="cocher la case"
                onChange={(event) => handleCheckboxChange(application.IdApplication, event.target.checked)}
                checked={application.IdApplication === selectedRow}
              /> */}
            {/* </td> */}
            {/* <td style={{ padding: '10px', color: 'black', border: '2px solid gray' }}>{application.IdApplication}</td> */}
            <td style={{  color: 'black', border: '2px solid gray',fontSize:'smaller',height:'30px' }}>{application.CodeApplication}</td>
            <td style={{  color: 'black', border: '2px solid gray',fontSize:'smaller',height:'30px' }}>{application.NomApplication}</td>
            {/* <td style={{  color: 'black', border: '2px solid gray', width:'5%',fontSize:'smaller',height:'30px' }}>
              <div style={{ display: 'flex', gap: '20%', justifyContent: 'center' }}>
                 <span title="Modifier " onClick={() => handleEdit(application)} > <EditOutlined /></span>
                 <span title="Supprimer " onClick={() => handleTableDeleteClick(application.IdApplication)}  ><DeleteOutlined /></span> 
              </div>
            </td> */}
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
      total={filteredApplications.length}
      onChange={setCurrentPage}
    />
        </div>
        <p style={{ color: 'black', width: '9.5%',float:'right',margin:'1% 0%' }}>
            NbrLig :
            <span >
            {rowCount}
          </span>
          </p>
          </div>
      </div>
      
<Modal 
  title={
    <div style={{color:"darkblue"}}>
      <span>
        {selectedApplication ? 'Modifier Application' : 'Saisie Application'}
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
  layout="vertical"
  ref={formRef}
  style={{ marginBlock: '1%', border: '2px solid blue', padding: "10px", borderRadius: '10px' }}
  initialValues={{
    codeApplication: selectedApplication ? selectedApplication.CodeApplication : '',
    nomApplication: selectedApplication ? selectedApplication.NomApplication : '',
  }}
  onFinish={handleModalSubmit}
>
  <Form.Item
    label={
      <span style={{ color: 'black'}}>
        Code Application
      </span>
    }
    name="codeApplication"
            rules={[{ required: true, message: 'Saisir le code de l\'application.' },
              // { whitespace: true, message: 'Le code de l\'application ne doit pas commencer par des espaces.' },  
            ]}
  >
    <Input 
      autoComplete="off"
      style={{ color: 'black'}}
      disabled={selectedApplication !== null}
      onChange={(e) => setCodeApplication(e.target.value)} 
    />
  </Form.Item>
  <Form.Item
    label={
      <span style={{ color: 'black' }}>
        Nom Application
      </span>
    }
    name="nomApplication"
          rules={[{ required: true, message: 'Saisir le nom de l\'application.' },
            // { whitespace: true, message: 'Le nom de l\'application ne doit pas commencer par des espaces.' },   
          ]}
  >
    <Input 
      autoComplete="off"
      style={{ color: 'black'}}
      onChange={(e) => setNomApplication(e.target.value)} 
    />
  </Form.Item>
</Form>

</Modal>

</div>
  )
};

export default TApp;




 