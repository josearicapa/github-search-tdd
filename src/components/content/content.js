import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { Typography, Box } from '@material-ui/core';
import TablePagination from '@mui/material/TablePagination';

const tableHeaders = ['Repository', 'Stars', 'Forks', 'Open Issues', 'Updated at'];

export const Content = ({ isSearchApplied, repoList, rowPerPage, setRowsPerPage}) => {
  
  const handleChangeRowsPerPage = ({target:{value}}) => setRowsPerPage(value);

  const renderWithBox = (msg) => 
    <Box display='flex' alignItems='center' justifyContent='center' height={400}>
      <Typography>{msg}</Typography>
    </Box>;

  if (isSearchApplied && !!repoList.length) {
    return( 
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeaders.map((name) => (
                  <TableCell key={name}>{name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                repoList.map((
                  {name, 
                    id,
                    stargazers_count: stargazersCount,
                    forks_count: forksCount,
                    open_issues: openIssues,
                    updated_at: updatedAt,
                    html_url: htmlUrl,
                    owner: {avatar_url:avatarUrl}
                  }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <Avatar alt={name} src={avatarUrl}/>
                      <Link href={htmlUrl}>{name}</Link>
                    </TableCell>
                    <TableCell>{stargazersCount}</TableCell>
                    <TableCell>{forksCount}</TableCell>
                    <TableCell>{openIssues}</TableCell>
                    <TableCell>{updatedAt}</TableCell>
                  </TableRow>
                ))
              }
            
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[30, 50, 100]} 
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
  repoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired
};
