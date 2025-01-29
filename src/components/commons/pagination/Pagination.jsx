import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

const TablePaginationDemo = ({ totalPages, setCurrentPage, currentPage, rowsPerPage, setRowsPerPage }) => {

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value==='All'?totalPages.pager.total:event.target.value);
    setCurrentPage(0);
  };

  return (
    <TablePagination
      style={{ margin: 0 }}
      component="div"
      count={totalPages.pager ? (totalPages.pager.total || 0) : 0}
      page={currentPage}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 15, 20, 30, 50, 100,'All']}
    />
  );
}

export { TablePaginationDemo }
