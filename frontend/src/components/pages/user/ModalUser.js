import { Button, Form, Image, Input, Modal, Select, message } from "antd";
import React, { useState } from "react";
import { MdCreateNewFolder, MdEditDocument } from "react-icons/md";
import UserDrawer from "./UserDrawer";

const ModalUser = ({ selectedUser, handleModalSubmit, isModalOpen, setIsModalOpen, formRef,
    applications, modules, page, NomUser, Email, PrenomUser, Photo, Role, setIdApplication, setIdModule,setIdPage, setNomUser,
setPhoto,setPrenomUser,setRole,setEmail,IdApplication,IdModule ,IdPage}
) => {
  const isEditMode = selectedUser !== null;
// const formData = new FormData();
// formData.append('Photo', Photo);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const showDrawer = () => {
    setIsDrawerOpen(true);
    setUserData({
      nomUser: NomUser,
      prenomUser: PrenomUser,
      email: Email,
      photo: Photo,
    });
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setUserData(null);
  };

    return (
        <div>
         <Modal
        title={
          <div style={{ color: "darkblue" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              {isEditMode ? (
                <MdEditDocument
                  style={{ marginRight: "2%", color: "black" }}
                />
              ) : (
                <MdCreateNewFolder
                  style={{ marginRight: "2%", color: "black" }}
                />
              )}
              <span>{isEditMode ? "Modifier Page" : "Saisie Page"}</span>
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
            IdApplication: selectedUser?.IdApplication || IdApplication,
            IdModule: selectedUser?.IdModule || IdModule,
            IdPage: selectedUser?.IdPage || IdPage,
            NomUser: selectedUser?.NomUser || NomUser,
            PrenomUser: selectedUser?.PrenomUser || PrenomUser,
            Email: selectedUser?.Email || Email,
            Photo: selectedUser?.Photo || Photo,
            Role: selectedUser?.Role || Role,
          }}
          >
           <Form.Item
  label={<span style={{ color: 'black' }}>Photo User</span>}
              name="fileInput"
              rules={[{ required: true, message: 'La photo est obligatoire' }]}
  initialValue={selectedUser?.Photo || Photo}
>
  <Input type="text" onChange={e => setPhoto(e.target.files[0])} />
</Form.Item>

            
                {!isEditMode && (
<div style={{display:'flex',gap:'3%',flexWrap:'wrap',position:'relative'}}>

    <Form.Item
      label={<span style={{ color: 'black' }}>Nom Application</span>}
      name="IdApplication"
      initialValue={selectedUser?.IdApplication || IdApplication}
    >
      <Select style={{width:'130px'}}
        showSearch
        placeholder="Sélectionner une application"
        optionFilterProp="children"
        disabled={selectedUser !== null}
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
      initialValue={selectedUser?.IdModule || IdModule}
    >
      <Select style={{width:'130px'}}
        showSearch
        placeholder="Sélectionner un module"
        optionFilterProp="children"
        disabled={selectedUser !== null}
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
  label={<span style={{ color: 'black' }}>Nom Page</span>}
  name="IdPage"
  initialValue={selectedUser?.IdPage || IdPage}
>
  <Select style={{width:'130px'}}
    showSearch
    placeholder="Sélectionner une page"
    optionFilterProp="children"
    disabled={selectedUser !== null}
    placement="bottom"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    onChange={value => setIdPage(value)}
  >
    {page && page.filter(p => p.IdModule === IdModule).map(p => (
      <Select.Option
        key={p.IdPage}
        value={p.IdPage}
      >
        {p.NomPage}
      </Select.Option>
    ))}
  </Select>
</Form.Item>
                
</div>
      )}
<div style={{display:'flex',gap:'7%',flexWrap:'wrap'}}>
    <Form.Item
      label={<span style={{ color: 'black' }}>Nom User</span>}
      name="NomUser"
      rules={[{ required: true, message: 'Le nom de la page est obligatoire' }]}
      initialValue={selectedUser?.NomUser || NomUser}
    >
      <Input
        placeholder="Saisir le nom de la page"
        autoComplete="off"
        onChange={e => setNomUser(e.target.value)}
      />
          </Form.Item>
    <Form.Item
      label={<span style={{ color: 'black' }}>Prenom User</span>}
      name="PrenomUser"
      rules={[{ required: true, message: 'Le nom de la page est obligatoire' }]}
      initialValue={selectedUser?.PrenomUser || PrenomUser}
    >
      <Input
        placeholder="Saisir le nom de la page"
        autoComplete="off"
        onChange={e => setPrenomUser(e.target.value)}
      />
                </Form.Item>
    <Form.Item
      label={<span style={{ color: 'black' }}>Email User</span>}
      name="Email"
      rules={[{ required: true, message: 'Le nom de la page est obligatoire' }]}
      initialValue={selectedUser?.Email || Email}
    >
      <Input
        placeholder="Saisir le nom de la page"
        autoComplete="off"
        onChange={e => setEmail(e.target.value)}
      />
          </Form.Item>
    <Form.Item
      label={<span style={{ color: 'black' }}>Role User</span>}
      name="Role"
      rules={[{ required: true, message: 'Le nom de la page est obligatoire' }]}
      initialValue={selectedUser?.Role || Role}
    >
      <Input
        placeholder="Saisir le nom de la page"
        autoComplete="off"
        onChange={e => setRole(e.target.value)}
      />
          </Form.Item>
   </div>
                          

          </Form>
{selectedUser !== null && (
  <Button type="primary" onClick={showDrawer}>
    Open
  </Button>
)}
<UserDrawer userData={userData} closeDrawer={closeDrawer} isDrawerOpen={isDrawerOpen} />

</Modal>
  
        </div>
    );
};

export default ModalUser;
