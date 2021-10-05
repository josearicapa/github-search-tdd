import React, {useState} from 'react'
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Box,
} from '@material-ui/core'

const GithubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchApplied, setIsSearchApplied] = useState(false)

  const handleClick = async () => {
    setIsSearching(true);
    await Promise.resolve();
    setIsSearchApplied(true);
    setIsSearching(true);
  }

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
      {isSearchApplied ? (
        <table />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={400}
        >
          <Typography>
            Please provide a search option and click in the search button
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default GithubSearchPage
