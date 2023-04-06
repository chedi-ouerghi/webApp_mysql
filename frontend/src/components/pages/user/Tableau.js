import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select, Checkbox } from 'antd';
// import Formulaire from './Formulaire';
import './formulaire.css'
import Search from 'antd/es/input/Search';
import { SearchOutlined } from '@ant-design/icons';
import { GrAdd } from 'react-icons/gr';
const { Option } = Select;

const columns = [
  {
    title: '',
    key: 'select',
    render: (text, record) => <Checkbox />,
  },
  {
    title: 'Nom',
    dataIndex: 'nom',
    key: 'nom',
  },
  {
    title: 'Prénom',
    dataIndex: 'prenom',
    key: 'prenom',
  },
  {
    title: 'Adresse',
    dataIndex: 'adresse',
    key: 'adresse',
  },
  {
    title: 'Téléphone',
    dataIndex: 'telephone',
    key: 'telephone',
  },
  {
    title: 'Type utilisateur',
    dataIndex: 'typeUtilisateur',
    key: 'typeUtilisateur',
  },
  {
    title: 'Date de naissance',
    dataIndex: 'dateNaissance',
    key: 'dateNaissance',
  },
];

const Tableau = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const handleCreate = (values) => {
    const newData = {
      key: dataSource.length + 1,
      nom: values.nom,
      prenom: values.prenom,
      adresse: values.adresse,
      telephone: values.telephone,
      typeUtilisateur: values.typeUtilisateur,
      dateNaissance: values.dateNaissance.format("DD/MM/YYYY"),
    };
    setDataSource([...dataSource, newData]);
    setVisible(false);
  };
  const [form] = Form.useForm();
  const handleCancel = () => {
    setVisible(false);
  };
 
  // Searchbar
  const onSearch = (value) => console.log(value);

  return (
    <>
      <div className='container_user'>
        <div className="actions_barre">
          <h2 style={{ color: "white", display: 'flex', justifyContent: "center", fontSize: "x-large" }}>
            gestion des users
        </h2>
          <Button onClick={() => setVisible(true)} style={{ display: "flex" }}>
            <GrAdd style={{ display: 'flex', alignItems: 'center', height: "100%" }} />
            Ajouter
          </Button>
</div>
          <div className="group-selection">
<Form className="search_barr">
<Form.Item>
 <Input style={{
                display: 'flex',alignItems:'center',width:'100%',height:'100%'}}
            prefix={<SearchOutlined />} 
            placeholder="Search by user name and code" 
           
          />
</Form.Item>
</Form>
       <div className='btn_del_edit'>
<Button >Edit</Button>
<Button >delete</Button>
</div> 
          </div>


      <div className='user_page'>
        <div >
          <Table 
          className='table_user'
           columns={columns}
            dataSource={dataSource}/>
        </div>
        <Modal
          title="Formulaire"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          {/* <Formulaire form={form} onCreate={handleCreate} onCancel={handleCancel} /> */}
        </Modal>
        </div>
        </div>
    </>
  );
};

export default Tableau;
