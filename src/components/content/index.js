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

export const Content = ({ isSearchApplied }) =>
  isSearchApplied ? (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Repository</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>Forks</TableCell>
            <TableCell>Open Issues</TableCell>
            <TableCell>Updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar alt='test' src='/logo192.png' />
              <Link href='http://localhost:3000/test'>Test</Link>
            </TableCell>
            <TableCell>10</TableCell>
            <TableCell>5</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2020-01-01</TableCell>
          </TableRow>
        </TableBody>{' '}
                 
      </Table>
    </TableContainer>
  ) : (
    <Box display='flex' alignItems='center' justifyContent='center' height={400}>
      <Typography>Please provide a search option and click in the search button</Typography>
    </Box>
  );

export default Content;

Content.prototypes = {
  isSearchApplied: PropTypes.bool.isRequired,
};
