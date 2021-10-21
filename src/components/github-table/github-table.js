import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';


const tableHeaders = ['Repository', 'Stars', 'Forks', 'Open Issues', 'Updated at'];


export const GitHubTable = ({repoList} ) => (  
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
  </TableContainer> );

GitHubTable.propTypes = {
  reposList: PropTypes.arrayOf(PropTypes.object)
};