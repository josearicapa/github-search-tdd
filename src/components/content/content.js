import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import TablePagination from '@mui/material/TablePagination';
import {GitHubTable} from '../github-table/github-table';

export const Content = ({ isSearchApplied, repoList, rowPerPage, setRowsPerPage}) => {
  
  const handleChangeRowsPerPage = ({target:{value}}) => setRowsPerPage(value);

  const renderWithBox = (msg) => 
    <Box display='flex' alignItems='center' justifyContent='center' height={400}>
      <Typography>{msg}</Typography>
    </Box>;

  if (isSearchApplied && !!repoList.length) {
    return( 
      <>
        <GitHubTable repoList={repoList} />
        <TablePagination 
          rowsPerPageOptions={[30, 50, 100]} 
          component='div' 
          colSpan={3} 
          count={1} 
          rowsPerPage={rowPerPage} 
          page={0} 
          onPageChange={() => {}} 
          onRowsPerPageChange={handleChangeRowsPerPage} 
        />
      </>
    );
  }

  if (isSearchApplied && !repoList.length) {
    return renderWithBox('You search has no results');    
  }
      
  return renderWithBox('Please provide a search option and click in the search button');
};

export default Content;

Content.prototypes = {
  isSearchApplied: PropTypes.bool.isRequired,
  repoList: PropTypes.arrayOf(PropTypes.object),
  rowPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired
};
