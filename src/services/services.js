const baseURL = process.env.NODE_ENV === 'test' ? '' : process.env.REACT_APP_BASE_URL;
export const getRepos = ({q, rowPerPage}) => {
  return fetch(`${baseURL}/search/repositories?q=${q}&page=0&per_page=${rowPerPage}`);
}