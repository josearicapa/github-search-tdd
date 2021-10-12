export const makeFakeResponse = ({totalCount = 0}) => ({
  total_count: totalCount,  
  items: []
});

export const makeFakeRepo = () => ({
  id: '306157569',
  name: "django-react-guide",
  owner: {
    avatar_url: "https://avatars.githubusercontent.com/u/12790824?v=4"    
  },
  html_url: "https://github.com/MattSegal",
  updated_at: "2021-08-25",
  stargazers_count: 14,
  forks_count: 10,
  open_issues: 0,
});
