import repos30Pagined from '../services/repos-30-paginated.json';
import repos50Pagined from '../services/repos-50-paginated.json';

export const makeFakeResponse = ({totalCount = 0} = {}) => ({
  total_count: totalCount,  
  items: []
});

export const makeFakeRepo = ({
  id ='306157569',
  name = 'django-react-guide'
} = {}) => ({
  id,
  name,
  owner: {
    avatar_url: "https://avatars.githubusercontent.com/u/12790824?v=4"    
  },
  html_url: "https://github.com/MattSegal",
  updated_at: "2021-08-25",
  stargazers_count: 14,
  forks_count: 10,
  open_issues: 0,
});

const reposData = ['go','freeCodeCamp', 'laravel', 'Python', 'Java','React'];

const reposList = reposData.map(name => makeFakeRepo({name, id: name}));

export const getReposListBy = ({name}) => {  
  return reposList.filter(repo => repo.name === name);
};

export const getReposPerPage = ({currentPage, perPage}) => {  
  return perPage === 30 
    ? repos30Pagined[currentPage]
    : repos50Pagined[currentPage];
}

