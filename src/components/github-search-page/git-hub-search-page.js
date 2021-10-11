import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Box } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

const GithubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const handleClick = async () => {
    setIsSearching(true);
    await Promise.resolve();
    setIsSearchApplied(true);
    setIsSearching(true);
  };

  const renderContent = () =>
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

  return (
    <Container>
      <Box my={4}>
        <Typography component='h1' variant='h3'>
          Github repositories list
        </Typography>
      </Box>
      <Grid container spacing={2} justify='space-between'>
        <Grid item md={6} xs={12}>
          <TextField fullWidth label='Filter by' id='filterBy' />
        </Grid>

        <Grid item md={3} xs={12}>
          <Button disabled={isSearching} fullWidth color='primary' variant='contained' onClick={handleClick}>
            Search
          </Button>
        </Grid>
      </Grid>

      {renderContent()}
    </Container>
  );
};

export default GithubSearchPage;
