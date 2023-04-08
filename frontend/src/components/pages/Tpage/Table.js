import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import React from "react";

const Table = ({ page,IdPage,IdModule,IdApplication,
    setSelectedPage, setIsModalOpen, handleRowDoubleClick, handleRowClick, handleCheckboxChange }) => {

//  console.log(page);
 
    // columns of table
const columns = [
  {
    title: "",
    key: "select",
    // render: (text, record) => (
    //   <Checkbox checked={selectedRows.includes(record.IdModule)} />
    // ),
  },
  {
    title: "ID Application",
    dataIndex: "IdApplication",
    key: "IdApplication",
    },
   {
title: 'NomApplication',
    dataIndex: 'NomApplication' ,
key: 'NomApplication',
},
  {
    title: "ID Module",
    dataIndex: "IdModule",
    key: "IdModule",
    },
    {
        title: 'Nom Module',
        dataIndex: 'NomModule',
        key: 'NomModule',
    },
  {
    title: "ID Page",
    dataIndex: "IdPage",
    key: "IdPage",
  },
  {
    title: "Nom de la page",
    dataIndex: "NomPage",
    key: "NomPage",
  },
];

     return (
    <div>
      <table style={{ color: "black", borderCollapse: 'collapse', border: '2px solid black', width: '97%', margin: '0% 1.5%' }}>
        <thead style={{ height:'45px' }}>
          <tr style={{ color: 'white', backgroundColor: '#2e445a' }}>
            {columns.map((column) => (
              <th key={column.key}
                // onClick={() => column.sorter && handleSort(column)}
                style={{ border: '2px solid black', backgroundColor: '#2e445a', fontWeight: '400' }}
              >
                {column.title}
              </th>
            ))}
             <th style={{ border: '2px solid black', backgroundColor: '#2e445a',fontWeight:'400' }}>Action</th>

          </tr>
        </thead>
        <tbody>
          {page.map((row) => (
            <tr className="body_table" key={row.IdPage}
              onClick={() => { handleRowClick(row) }}
              onDoubleClick={() => handleRowDoubleClick(row)}
            >
              <td
                style={{
                  width: "10px",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "smaller",
                  margin: "0% 33%",
                }}
              >
                <Checkbox
                  title="cocher la case"
                  onChange={(event) => handleCheckboxChange(row.IdPage, event.target.checked)}
                />
              </td>
              <td
                style={{
                  color: "black",
                  border: "2px solid gray",
                  fontSize: "smaller",
                  height: "30px",
                }}
              >
                {row.IdApplication}
              </td>
              <td
                style={{
                  color: "black",
                  border: "2px solid gray",
                  fontSize: "smaller",
                  height: "30",
          }}
        >
          {row.NomApplication}
        </td>
        <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
            width: "15%",
          }}
        >
          {row.IdModule}
        </td>
        <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
            width: "15%",
          }}
        >
          {row.NomModule}
        </td>
        <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
            width: "15%",
          }}
        >
          {row.IdPage}
        </td>
        <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
          }}
        >
          {row.NomPage}
        </td>
        <td
          style={{
            color: "black",
            border: "2px solid gray",
            width: "5%",
            fontSize: "smaller",
            height: "30px",
          }}
                  >
          <div
            style={{
              display: "flex",
              gap: "20%",
              justifyContent: "center",
            }}
                      >
            <span
              title="Modifier"
              // onClick={() => handleEdit(page)}
            >
              <EditOutlined />
            </span>
            <span
              title="Supprimer"
              // onClick={() => handleTableDeleteClick(page.IdPage)}
            >
              <DeleteOutlined />
            </span>
        </div>
      </td>
    </tr>
  ))}
</tbody>

</table>

        </div>
    )
};

export default Table;
