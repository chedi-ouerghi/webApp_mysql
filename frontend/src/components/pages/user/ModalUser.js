import { Form, Input, Modal, Select, message } from "antd";
import React from "react";
import { MdCreateNewFolder, MdEditDocument } from "react-icons/md";

const ModalUser = ({ selectedUser, handleModalSubmit, isModalOpen, setIsModalOpen, formRef,
    applications, modules, page, NomUser, Email, PrenomUser, Photo, Role, setIdApplication, setIdModule,setIdPage, setNomUser,
setPhoto,setPrenomUser,setRole,setEmail,IdApplication,IdModule ,IdPage}
) => {
    return (
        <div>
          <Modal
  title={
    <div style={{ color: 'darkblue' }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {selectedUser ? (
          <MdEditDocument style={{ marginRight: '2%', color: 'black' }} />
        ) : (
          <MdCreateNewFolder style={{ marginRight: '2%', color: 'black' }} />
        )}
        <span>{selectedUser ? 'Saisie Page' : 'Saisie Page'}</span>
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
      label={<span style={{ color: 'black' }}>Nom Application</span>}
      name="IdApplication"
      initialValue={selectedUser?.IdApplication || IdApplication}
    >
      <Select
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
      <Select
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
label={<span style={{ color: "black" }}>Nom Page</span>}
name="IdPage"
initialValue={selectedUser?.IdPage || IdPage}
>
<Select
showSearch
placeholder="Sélectionner une page"
          optionFilterProp="children"
          disabled={selectedUser !== null}
placement="bottom"
filterOption={(input, option) =>
option.children
.toLowerCase()
.indexOf(input.toLowerCase()) >= 0
}
onChange={(value) => setIdPage(value)}
>
{page &&
page.map((pages) => (
<Select.Option key={pages.IdPage} value={pages.IdPage}>
{pages.NomPage}
</Select.Option>
))}
</Select>
</Form.Item>
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
      label={<span style={{ color: 'black' }}>Photo User</span>}
      name="Photo"
      rules={[{ required: true, message: 'Le nom de la page est obligatoire' }]}
      initialValue={selectedUser?.Photo || Photo}
    >
      <Input
        placeholder="Saisir le nom de la page"
        autoComplete="off"
        onChange={e => setPhoto(e.target.value)}
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
          
  </Form>
</Modal>
  
        </div>
    );
};

export default ModalUser;
