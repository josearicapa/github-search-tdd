const baseURL = process.env.NODE_ENV === 'test' ? '' : process.env.REACT_APP_BASE_URL;
export const getRepos = () => fetch(`${baseURL}/search/repositories?q=react+language:python&page=2&per_page=50`);