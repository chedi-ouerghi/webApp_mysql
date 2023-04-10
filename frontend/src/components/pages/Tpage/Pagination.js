import { Empty } from "antd";
import React from "react";

const Pagination = ({ filteredPage,setCurrentPage,rowCount,isDataAvailable }) => {
// pagination
  const PAGE_SIZE = 5;
  const indexOfLastPage = currentPage * PAGE_SIZE;
  const indexOfFirstPage = indexOfLastPage - PAGE_SIZE;
  const currentPage = filteredPage.slice(indexOfFirstPage, indexOfLastPage);

const pageCount = Math.ceil(filteredPage.length / PAGE_SIZE);

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

  
    return (
        <div>
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
      total={filteredPage.length}
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
        </div>
    )
};

export default Pagination;
