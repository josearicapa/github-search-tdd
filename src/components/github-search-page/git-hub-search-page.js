import React, {useState} from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Box,
} from '@material-ui/core';

const GithubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
 
  const handleClick = async () => {
    setIsSearching(true);        
  };

  return (
    <Container>
      <Box my={4}>
        <Typography component="h1" variant="h3">
          Github repositories list
        </Typography>
      </Box>
      <Grid container spacing={2} justify="space-between">
        <Grid item md={6} xs={12}>
          <TextField fullWidth label="Filter by" id="filterBy" />
        </Grid>

        <Grid item md={3} xs={12}>
          <Button
            disabled={isSearching}
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Search
          </Button>
        </Grid>
      </Grid>      
    </Container>
  );
};

export default GithubSearchPage;
