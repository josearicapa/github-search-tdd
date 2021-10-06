import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Box } from '@material-ui/core';

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
      <table>
        <thead>
          <tr>
            <th>
              <img alt='test' src='' />
              Repository
            </th>
            <th>Start</th>
            <th>Forks</th>
            <th>Open Issues</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test</td>
            <td>10</td>
            <td>5</td>
            <td>2</td>
            <td>2020-01-01</td>
          </tr>
        </tbody>
      </table>
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
