import { Form, Input, Modal, Select, message } from "antd";
import React from "react";
import { MdCreateNewFolder, MdEditDocument } from "react-icons/md";

const ModalPage = ({ page, isModalOpen, handleModalSubmit,
    formRef, setNomPage, selectedPage, setIsModalOpen,NomPage }) => {

    return (
        <div>
            <Modal
                title={
                    <div style={{ color: 'darkblue' }}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            {selectedPage ? <MdEditDocument style={{ marginRight: '2%', color: 'black' }} /> : <MdCreateNewFolder style={{ marginRight: '2%', color: 'black' }} />}
                            <span>{selectedPage ? 'update Page' : 'Saisie Page'}</span>
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
                {/* Render the form only when `selectedPage` is truthy */}
                {selectedPage && (
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
                            Nompage: selectedPage.Nompage
                        }}
                    >
                        <Form.Item
                            label={<span style={{ color: 'black' }}>Nom Application</span>}
                            name="IdApplication"
                        >
                                    {/* {message.info(selectedPage.NomApplication)} */}

                            <Select
    disabled={selectedPage !== null}
    style={{
        background: 'azur',
        color: 'black',
        fontWeight: '500'
    }}
>
    {page && page.map((pages, index) => (
        <Select.Option
            key={`page-${index}`}
            value={pages.IdApplication}
        >
            {pages.NomApplication}
        </Select.Option>
    ))}
</Select>
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ color: 'black' }}>Nom Module</span>}
                            name="IdModule"
                        >
                                    {/* {message.info(selectedPage.NomModule)} */}

                           <Select
    style={{
        background: 'azur',
        color: 'black',
        fontWeight: '500'
    }}
>
    {page && page.map((pages, index) => (
        <Select.Option
            key={`page-${index}`}
            value={pages.IdModule}
        >
            {pages.NomModule}
        </Select.Option>
    ))}
</Select>
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ color: 'black' }}>Nom page</span>}
                            name="Nompage"
                            rules={[{ required: true, message: "Saisir le nom du page." }]}
                            // { whitespace: true, message: 'Le nom du page ne doit pas commencer par des espaces.' },        ]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={e => setNomPage(e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                )}
   {!selectedPage && (
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
        IdApplication: selectedPage?.IdApplication || "",
        IdModule: selectedPage?.IdModule || "",
        Nompage: selectedPage?.Nompage || ""
    }} 
                    >
                        <Form.Item
                            label={<span style={{ color: 'black' }}>Nom Application</span>}
                            name="IdApplication"
                        >
                                    {/* {message.info(selectedPage.NomApplication)} */}

                           <Select
    disabled={selectedPage !== null}
    style={{
        background: 'azur',
        color: 'black',
        fontWeight: '500'
    }}
>
    {page && page.map((pages, index) => (
        <Select.Option
            key={`page-${index}`}
            value={pages.IdApplication}
        >
            {pages.NomApplication}
        </Select.Option>
    ))}
</Select>
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ color: 'black' }}>Nom Module</span>}
                            name="IdModule"
                        >
                                    {/* {message.info(selectedPage.NomModule)} */}

                           <Select
    style={{
        background: 'azur',
        color: 'black',
        fontWeight: '500'
    }}
>
    {page && page.map((pages, index) => (
        <Select.Option
            key={`page-${index}`}
            value={pages.IdModule}
        >
            {pages.NomModule}
        </Select.Option>
    ))}
</Select>
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ color: 'black' }}>Nom page</span>}
                            name="Nompage"
                            rules={[{ required: true, message: "Saisir le nom du page." }]}
                            // { whitespace: true, message: 'Le nom du page ne doit pas commencer par des espaces.' },        ]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={e => setNomPage(e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                )}

            </Modal>
        </div>
    )
};

export default ModalPage;
