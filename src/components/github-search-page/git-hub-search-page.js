import React, { useState,useRef,useEffect,useCallback } from 'react';
import { Typography, TextField, Button, Container, Grid, Box } from '@material-ui/core';
import { Content } from '../content/content.js';
import {getRepos} from '../../services/services.js'


const GithubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [repoList, setReposList] = useState([]);
  const searchByInput = useRef(null);
  let _isMounted = useRef(true);
  const [rowPerPage, setRowsPerPage] = useState(30);

  
  const handleSearch = useCallback(async () => {
    setIsSearching(true);
    const response = await getRepos(
      {
        q: searchByInput.current.value, 
        rowPerPage
      }
    );
    
    const data = await response.json();
    data.items && setReposList(data.items);

    setIsSearchApplied(true);
    setIsSearching(false);        
        
  },[rowPerPage]);
  
  useEffect(() => {    
    return () => {
      _isMounted.current = false;
    };    
  }, [handleSearch]);

  return (
    <Container>
      <Box my={4}>
        <Typography component='h1' variant='h3'>
          Github repositories list
        </Typography>
      </Box>
      <Grid container spacing={2} justify='space-between'>
        <Grid item md={6} xs={12}>
          <TextField inputRef={searchByInput} fullWidth label='Filter by' id='filterBy' />
        </Grid>

        <Grid item md={3} xs={12}>
          <Button disabled={isSearching} fullWidth color='primary' variant='contained' onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      <Box my={4}>
        <Content isSearchApplied={isSearchApplied} repoList={repoList} rowPerPage={rowPerPage} setRowsPerPage={setRowsPerPage} />
      </Box>
    </Container>
  );
};

export default GithubSearchPage;
