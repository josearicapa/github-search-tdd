import React, { useState,useRef,useEffect } from 'react';
import { Typography, TextField, Button, Container, Grid, Box } from '@material-ui/core';
import { Content } from '../content/content.js';
import {getRepos} from '../../services/services.js'


const GithubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [repoList, setReposList] = useState([]);
  const [searchBy, setSearchBy] = useState();
  let _isMounted = useRef(true);

  useEffect(() => {    
    return () => {
      _isMounted.current = false;
    }
  }, [])

  const handleClick = async () => {
    setIsSearching(true);
    const response = await getRepos({q: searchBy});
    const data = await response.json();

    if (_isMounted.current) {
      setReposList(data.items);
      setIsSearchApplied(true);
      setIsSearching(true);  
    }    
  };

  const handleChange = ({target:{value}}) => {
    setSearchBy(value);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography component='h1' variant='h3'>
          Github repositories list
        </Typography>
      </Box>
      <Grid container spacing={2} justify='space-between'>
        <Grid item md={6} xs={12}>
          <TextField value={searchBy} onChange={handleChange} fullWidth label='Filter by' id='filterBy' />
        </Grid>

        <Grid item md={3} xs={12}>
          <Button disabled={isSearching} fullWidth color='primary' variant='contained' onClick={handleClick}>
            Search
          </Button>
        </Grid>
      </Grid>

      <Box my={4}>
        <Content isSearchApplied={isSearchApplied} repoList={repoList} />
      </Box>
    </Container>
  );
};

export default GithubSearchPage;
