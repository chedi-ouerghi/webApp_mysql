
import React, { useState, useEffect, useRef } from 'react';
import { Input, message, Form, Checkbox, Modal, Button, Empty, Popover, Pagination } from 'antd';
import { createApplication, deleteApplication, getApplications, updateApplication } from '../../../api/apiApplicarion';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import './tapp.css';

const TApp = () => {
  const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
  const [codeApplication, setCodeApplication] = useState('');
  const [nomApplication, setNomApplication] = useState('');
  const [isSortAscending, setIsSortAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
const [form] = Form.useForm(); // Add this line to create a form instance
const formRef = useRef(null);

  const [rowCount, setRowCount] = useState(0);

 useEffect(() => {
    const fetchData = async () => {
      const data = await getApplications();
      setApplications(data);
      setRowCount(data.length);
    };
    fetchData();
 }, []);

  useEffect(() => {
    setRowCount(applications.length);
  }, [applications]);

  
  useEffect(() => {
    setFilteredApplications(applications);
  }, [applications]);
 
  
    const { confirm } = Modal ;

  // double click to open modal edit 
  const handleRowDoubleClick = (record) => {
  setSelectedApplication(record);
  setCodeApplication(record.CodeApplication);
  setNomApplication(record.NomApplication);
  setIsModalOpen(true);
};

  // ::::::::::::::::::
const handleModalSubmit = () => {
  if (!codeApplication || !nomApplication) {
    message.error('Veuillez remplir les champs obligatoires');
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
        message.success('La mise à jour de l\'application a été effectuée avec succès.');
        setIsModalOpen(false);
        setSelectedApplication(null);
        setCodeApplication('');
        setNomApplication('');
      })
      .catch(error => {
        message.error('La mise à jour de l\'application a échoué.');
      });
  } else {
    createApplication({
      CodeApplication: codeApplication,
      NomApplication: nomApplication,
    })
      .then((newApplication) => {
        setApplications([...applications, newApplication]);
        message.success('L\'application a été créée avec succès.');
        setSelectedApplication(null);
        formRef.current.resetFields(); // reset the form fields
        setCodeApplication('');
        setNomApplication('');
      })
       .catch(error => {
        message.error(`La création de l'application a échoué. Erreur: ${'le code de l\'application est unique'}`);
      });
  }
};



 // ::::::::::::::::::
// const handleModalClose = () => {
//   setCodeApplication('');
//   setNomApplication('');
//   setIsModalOpen(false);
// };

    // ::::::::::::::::::

  const handleCreateClick = () => {
    setSelectedApplication(null);
    setCodeApplication('');
    setNomApplication('');
    setIsModalOpen(true);
  };
  // ::::::::::::::::::
  const handleEdit = (rowData) => {
  // console.log('handleEdit called', rowData);
    if (rowData) {
    setCodeApplication(rowData.CodeApplication);
    setNomApplication(rowData.NomApplication);
  }
  setSelectedApplication(rowData);
  setIsModalOpen(true);
};

  const handleEditClick = (application) => {
    setSelectedApplication(application);
    setCodeApplication(application.CodeApplication);
    setNomApplication(application.NomApplication);
    setIsModalOpen(true);
  };

  // ::::::::::::::::::
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
  // ::::::::::::::::::

  // const handleRowSelectionChange = (selectedRowKeys) => {
  //   setSelectedRows(selectedRowKeys);
  // };

  // fonction delete with confirmation
const handleDelete = (id) => {
  if (id) {
    deleteApplication(id)
      .then(() => {
        setApplications(applications.filter(application => application.IdApplication !== id));
        message.success('Suppression de l\'application réussie.');
      })
      .catch(error => {
        message.error('Failed to delete application');
      });
  } else {
    deleteApplication(selectedRows)
      .then(() => {
        setApplications(applications.filter(application => !selectedRows.includes(application.IdApplication)));
        setSelectedRows([]);
        message.success('Suppression de l\'application réussie.');
      })
      .catch(error => {
        message.error('La suppression de l\'application a échoué.');
      });
  }
};

// handle delete click inside table
const handleTableDeleteClick = (id) => {
  confirm({
    title: 'Voulez-vous supprimer la ligne?',
    icon: <ExclamationCircleOutlined />,
    cancelText: 'Non',
    okText: 'Oui',
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
    okText: 'Oui',
    okType: 'danger',
    cancelText: 'Non',
    onOk() {
      handleDelete();
    },
    onCancel() {},
  });
};

// const dataSource = applications.map(application => {
//   return { ...application, key: application.IdApplication, selected: false };
// });
  
    // ::::::::::::::::::

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
  setSelectedRowData(record);
  }; 

  const columns = [
    {
      title: '',
      key: 'select',
      render: (text) => <Checkbox />,
    },
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

  const PAGE_SIZE = 17;
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
// fleche 
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };
      const [totalRowCount, setTotalRowCount] = useState(0);

  // ... code to calculate currentApplications and renderPageNumbers

  const handleRowCount = () => {
    setTotalRowCount(filteredApplications.length);
  };


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
      <Input
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
  <tr style={{ color: 'white', backgroundColor: 'darkblue' }}>
    {columns.map((column) => (
      <th key={column.key} onClick={() => column.sorter && handleSort(column)} style={{ border: '2px solid black', backgroundColor: 'darkblue',fontWeight:'400' }}>
        {column.title}
      </th>
    ))}
    <th style={{ border: '2px solid black', backgroundColor: 'darkblue',fontWeight:'400' }}>Action</th>
  </tr>
</thead>
      <tbody >
        {currentApplications.map((application) => (
          <tr className='body_table' key={application.IdApplication}
            onClick={() => { handleRowClick(application) }}
            onDoubleClick={() => handleRowDoubleClick(application)}
            style={{ border: '2px solid gray', height: '10px' }}>
            <td
              style={{width:'6px', color: 'black',  display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'smaller',margin:'0% 33%'  }}
            >
              <Checkbox title="cocher la case "
                onChange={(event) => handleCheckboxChange(application.IdApplication, event.target.checked)} />
            </td>
            {/* <td style={{ padding: '10px', color: 'black', border: '2px solid gray' }}>{application.IdApplication}</td> */}
            <td style={{  color: 'black', border: '2px solid gray',fontSize:'smaller',height:'30px' }}>{application.CodeApplication}</td>
            <td style={{  color: 'black', border: '2px solid gray',fontSize:'smaller',height:'30px' }}>{application.NomApplication}</td>
            <td style={{  color: 'black', border: '2px solid gray', width:'5%',fontSize:'smaller',height:'30px' }}>
              <div style={{ display: 'flex', gap: '20%', justifyContent: 'center' }}>
                <span title="Modifier " onClick={() => handleEdit(application)} > <EditOutlined /></span>
                <span title="Supprimer " onClick={() => handleTableDeleteClick(application.IdApplication)}  ><DeleteOutlined /></span>
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
        </div>}
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
            Nbr des lignes :
            <span
              // style={{ border: '2px solid blue', margin: '0% 2%' }}
            >
            {rowCount}
          </span>
          </p>
      </div>
      
     <Modal 
  title={
    <div style={{color:"darkblue"}}>
    <span >
      {selectedApplication ? 'Edit Application' : 'Create Application'}
    </span>
    </div>} 
 open={isModalOpen} 
 onOk={handleModalSubmit} 
 onCancel={() => setIsModalOpen(false)}
          okText="Enregistrer"
        cancelText="Fermer"
        destroyOnClose={true}
      >
        {selectedApplication && (
          <Form layout="vertical"
                style={{ marginBlock: '1%', border: '2px solid blue', padding: "10px", borderRadius: '10px' }} 
          >
     <Form.Item
      label={
        <span style={{ color: 'black'}}>
          Code Application
        </span>
      }>
              <Input value={codeApplication}
            autoComplete="off"
                disabled={selectedApplication !== null}
                onChange={(e) => setCodeApplication(e.target.value)} />
      </Form.Item>
            <Form.Item
             label={
              <span style={{ color: 'black' }}>
                Nom Application
              </span>
            }
              rules={[{ required: true, message: 'Saisir le nom de l\'application.' },
                // { whitespace: true, message: 'Le nom de l\'application ne doit pas commencer par des espaces.' },
              ]}
          >
            
              <Input value={nomApplication}
            autoComplete="off"
                onChange={(e) => setNomApplication(e.target.value)} />
      </Form.Item>
          </Form>
          )}
        {!selectedApplication && (
          <Form layout="vertical"
            ref={formRef}
            style={{ marginBlock: '1%', border: '2px solid blue', padding: "10px", borderRadius: '10px' }} 
          >
            <Form.Item
             label={
              <span style={{ color: 'black' }}>
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
                          // ref={codeApplicationRef}
                value={codeApplication} onChange={(e) => setCodeApplication(e.target.value)}  />
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
              <Input value={nomApplication}
            autoComplete="off"
                onChange={(e) => setNomApplication(e.target.value)} />
            </Form.Item>
          </Form>
        )}
      
</Modal>
</div>
  )
};

export default TApp;




 