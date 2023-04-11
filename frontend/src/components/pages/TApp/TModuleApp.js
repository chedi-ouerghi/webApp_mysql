
import React, { useState, useEffect, useRef } from 'react';
import { Input, message, Form, Checkbox, Modal, Button, Empty, Popover, Pagination } from 'antd';
import { createApplication, deleteApplication, getApplications, updateApplication } from '../../api/apiApplicarion';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import './tapp.css';
import Search from 'antd/es/transfer/search';

const TModuleApp = () => {
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

  const PAGE_SIZE = 14;
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
   saisie des Applications
            </h2>
        </div>
    
</div>
  )
};

export default TModuleApp;




 