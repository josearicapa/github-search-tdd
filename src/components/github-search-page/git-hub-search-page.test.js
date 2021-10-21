import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import GithubSearchPage from './git-hub-search-page';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { makeFakeResponse,makeFakeRepo, getReposListBy, getReposPerPage } from '../../__fixtures__/repos';
import {OK_STATUS} from '../../constants'

const fakeRepo = makeFakeRepo();

const fakeResponse = makeFakeResponse({totalCount: 1});
fakeResponse.items = [makeFakeRepo()];

const server = setupServer(
  rest.get('/search/repositories', (req, res, ctx) => {    
    return res(
      ctx.status(OK_STATUS),
      ctx.json(fakeResponse)
    );
  }),
);

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

beforeEach(() => render(<GithubSearchPage />));

const fireClickSearch = () => {
  fireEvent.click(screen.getByRole('button', { name: /search/i }));
};

describe('when the GitHub Search Page is mounted', () => {
  it('should must display the title', () => {
    expect(screen.getByRole('heading', { name: /github repositories list/i })).toBeInTheDocument();
  });

  it('should be have an input text with label "filter by" field in order to do the search.', () => {
    expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument();
  });

  it('should be have a Search button', () => {
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should be an initial message "Please provide a search option and click in the search button"', () => {
    expect(screen.getByText(/Please provide a search option and click in the search button/i)).toBeInTheDocument();
  });
});

describe('when the developer does a search', () => {
 
  it('the search should be disabled until the search is done', async () => {
    expect(screen.getByRole('button', { name: /search/i })).not.toBeDisabled();
    fireClickSearch();
    await waitFor(() => expect(screen.getByRole('button', { name: /search/i })).toBeDisabled());
  });

  it('The data should be displayed as a sticky table', async () => {
    fireClickSearch();
    await waitFor(() => expect(screen.queryByText(/Please provide a search option and click in the search button/i)).not.toBeInTheDocument());
    expect(screen.getByRole('table')).toBeDefined();
  });

  it('The header table should contain: Repository, stars, forks, open issues and updated at', async () => {
    fireClickSearch();

    const table = await screen.findByRole('table');
    // within permite hacer consultas solo de un determinado nodo
    const tableHeaders = within(table).getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(5);

    const [repository, stars, forks, openIssues, updatedAt] = tableHeaders;

    expect(repository).toHaveTextContent(/repository/i);
    expect(stars).toHaveTextContent(/stars/i);
    expect(forks).toHaveTextContent(/forks/i);
    expect(openIssues).toHaveTextContent(/open issues/i);
    expect(updatedAt).toHaveTextContent(/updated at/i);
  });

  it(`Each table result should have: owner avatar image, name, stars, updated at, forks, open issues
  It should have a link that opens in a new tab the github repository selected`, async () => {
    fireClickSearch();

    const table = await screen.findByRole('table');
    const withTable = within(table);
    const tableCells = withTable.getAllByRole('cell');
    const [repository, stars, forks, openIssues, updatedAt] = tableCells;
    const avatarImg  = within(repository).getByRole('img', { name: fakeRepo.name });
    expect(avatarImg).toBeInTheDocument();
    expect(tableCells).toHaveLength(5);
    expect(repository).toHaveTextContent(fakeRepo.name);
    expect(stars).toHaveTextContent(fakeRepo.stargazers_count);
    expect(forks).toHaveTextContent(fakeRepo.forks_count);
    expect(openIssues).toHaveTextContent(fakeRepo.open_issues);
    expect(updatedAt).toHaveTextContent(fakeRepo.updated_at);

    expect(withTable.getByText(fakeRepo.name).closest('a')).toHaveAttribute('href', fakeRepo.html_url);

    expect(avatarImg).toHaveAttribute("src", fakeRepo.owner.avatar_url.url);
  });

  it('must display the total results number of the search and the current number of results', async () => {
    fireClickSearch();
    await screen.findByRole('table');
    expect(screen.getByText(/1-1 of 1/i)).toBeInTheDocument();
  });

  it('A results size per page select/combobox with the options: 30, 50, 100. The default is 30.', async () => {
    fireClickSearch();
    await screen.findByRole('table');
    expect(screen.getByLabelText(/rows per page/i)).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByLabelText(/rows per page/i));

    const listbox = screen.getByRole('listbox', { name: /rows per page/i });
    const options = within(listbox).getAllByRole('option');

    const [option30, option50, option100] = options;
    expect(option30).toHaveTextContent(/30/);
    expect(option50).toHaveTextContent(/50/);
    expect(option100).toHaveTextContent(/100/);
  });

  it('Must exists the Next and previous pagination button', async () => {
    fireClickSearch();
    await screen.findByRole('table');
    const previousPageBtn = screen.getByRole('button', { name: /previous page/i });
    expect(previousPageBtn).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
    expect(previousPageBtn).toBeDisabled();
  });
});

describe('when the developer does a search without results', () => {
  it('must show a empty state message', async () => {
    // set the mock server retorno no items
    server.use(
      rest.get('/search/repositories', (req, res, ctx) =>
        res(
          ctx.status(OK_STATUS),
          ctx.json(makeFakeResponse({}))
        )
      ),
    );
    // clic search
    fireClickSearch();

    //expect no table
    await waitFor(() => {
      expect(screen.getByText(/You search has no results/i)).toBeInTheDocument();
    });

    //expect messsages no result
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  })
});

describe('when the developer types on filter by and does a search', () => {
  it('must display the releated repos', async () => {
    //La respuesta va hacer todo lo que devuelva getRepos
    const fakeResponse = makeFakeResponse();
    const repoName = 'laravel';

    const expectRepo = getReposListBy({name: repoName})[0];
    
    server.use(
      rest.get('/search/repositories', (req, res, ctx) =>
        res(
          ctx.status(OK_STATUS),
          ctx.json(
            {...fakeResponse, 
              items: getReposListBy({
                name: req.url.searchParams.get('q')
              })
            }
          )
        )
      ),
    );
    const fieldFilter = screen.getByLabelText(/filter by/i);   
    fireEvent.change(fieldFilter, {target: {value: 'laravel'}});    
    fireClickSearch();
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    // No es necesario agregar los expect de celdas porque ya estan cubiertas en otras pruebas.
    const withTable = within(table);
    const tableCells = withTable.getAllByRole('cell');
    const [repository] = tableCells;   
    expect(repository).toHaveTextContent(expectRepo.name);
  });
});

describe('when the developer does a search and selects 50 rows per page', () => {
  it('must fetch a new search and display 50 rows results on the table', async () => {
    server.use(
      rest.get('/search/repositories', (req, res, ctx) =>
        res(
          ctx.status(OK_STATUS),
          ctx.json(
            {...makeFakeResponse(), 
              items: getReposPerPage({
                perPage: Number(req.url.searchParams.get('per_page')),
                currentPage: req.url.searchParams.get('page')
              })
            }
          )
        )
      ),
    );

    fireClickSearch();

    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(await screen.findAllByRole('row')).toHaveLength(31);

    fireEvent.mouseDown(screen.getByLabelText(/rows per page/i));
    fireEvent.click(screen.getByRole('option', {name: '50'}));
    
    fireClickSearch();

    await waitFor(() => {
      expect(screen.getByRole('button',{name: /search/i})).not.toBeDisabled();
    });

    expect(screen.getAllByRole('row')).toHaveLength(51);
  
  });
});