import React from "react";

const TableUser = ({ filteredUser, handleSort, selectedRow
  , handleRowDoubleClick,handleRowClick }) => {

    const columns = [
  // {
  //   title: '',
  //   key: 'select',
  //   render: (text, record) => (
  //     <Checkbox checked={selectedRows.includes(record.IdUser)} />
  //   ),
  // },
  // {
  //   title: 'ID Application',
  //   dataIndex: 'IdApplication',
  //   key: 'IdApplication',
  //       },
     {
title: 'NomApplication',
    dataIndex: 'NomApplication' ,
key: 'NomApplication',
},
  // {
  //   title: 'ID Module',
  //   dataIndex: 'IdModule',
  //   key: 'IdModule',
  //       },
    {
        title: 'Nom Module',
        dataIndex: 'NomModule',
        key: 'NomModule',
    },
  // {
  //   title: 'ID Page',
  //   dataIndex: 'IdPage',
  //   key: 'IdPage',
  //       },
   {
    title: "Nom de la page",
    dataIndex: "NomPage",
    key: "NomPage",
  },
  // {
  //   title: 'ID User',
  //   dataIndex: 'IdUser',
  //   key: 'IdUser',
  // },
  {
    title: 'Nom User',
    dataIndex: 'NomUser',
    key: 'NomUser',
  },
  {
    title: 'Prenom User',
    dataIndex: 'PrenomUser',
    key: 'PrenomUser',
  },
  {
    title: 'Email',
    dataIndex: 'Email',
    key: 'Email',
  },
  {
    title: 'Photo',
    dataIndex: 'Photo',
    key: 'Photo',
  },
  {
    title: 'Role',
    dataIndex: 'Role',
    key: 'Role',
  },
    ];
    
    return (
        <div>
         <table style={{ color: "black", borderCollapse: 'collapse', border: '2px solid black', width: '97%', margin: '0% 1.5%' }}>
        <thead style={{ height:'45px' }}>
          <tr style={{ color: 'white', backgroundColor: '#2e445a' }}>
            {columns.map((column) => (
              <th key={column.key}
                onClick={() => column.sorter && handleSort(column)}
                style={{ border: '2px solid black', backgroundColor: '#2e445a', fontWeight: '400' }}
              >
                {column.title}
              </th>
            ))}
             {/* <th style={{ border: '2px solid black', backgroundColor: '#2e445a',fontWeight:'400' }}>Action</th> */}

          </tr>
        </thead>
        <tbody>
          {filteredUser.map((row) => (
            <tr className="body_table" key={row.IdUser}
              onClick={() => { handleRowClick(row) }}
              onDoubleClick={() => handleRowDoubleClick(row)}
                 style={{
          border: '2px solid gray', height: '10px',
                     backgroundColor: row.IdUser === selectedRow ? '#add8e6' : ''

        }}
            >
              {/* <td
                style={{ width:'10px', color: 'black',  display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize:'smaller',margin:'0% 33%' }}
              >
                <Checkbox
                  title="cocher la case"
                  onChange={(event) => handleCheckboxChange(row.IdUser, event.target.checked)}
                />
              </td> */}
              {/* <td
                style={{
                  color: "black",
                  border: "2px solid gray",
                  fontSize: "smaller",
                  height: "30px",
                }}
              >
                {row.IdApplication}
              </td> */}
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
        {/* <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
            // width: "15%",
          }}
        >
          {row.IdModule}
        </td> */}
        <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
            // width: "15%",
          }}
        >
          {row.NomModule}
        </td>
        {/* <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
            // width: "15%",
          }}
        >
          {row.IdPage}
        </td> */}
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
                    {/* <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
          }}
        >
          {row.IdUser}
                  </td> */}
                    <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
          }}
        >
          {row.NomUser}
                  </td>
                    <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
          }}
        >
          {row.PrenomUser}
                  </td>
                    <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
          }}
        >
          {row.Email}
                  </td>
                    <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
          }}
        >
          {row.Photo}
                  </td>
                    <td
          style={{
            color: "black",
            border: "2px solid gray",
            fontSize: "smaller",
            height: "30px",
          }}
        >
          {row.Role}
        </td>
       
    </tr>
  ))}
</tbody>

         </table>
        </div>
    )
};

export default TableUser;
