import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import GithubSearchPage from './git-hub-search-page';

beforeEach(() => render(<GithubSearchPage />));

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
  const fireClickSearch = () => {
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
  };

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
    expect(stars).toHaveTextContent(/start/i);
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
    const [repository, stars, forks, openUssues, updatedAt] = tableCells;

    expect(within(repository).getByRole('img', { name: /test/i })).toBeDefined();
    expect(tableCells).toHaveLength(5);
    expect(repository).toHaveTextContent(/Test/i);
    expect(stars).toHaveTextContent(/10/i);
    expect(forks).toHaveTextContent(/5/i);
    expect(openUssues).toHaveTextContent(/2/i);
    expect(updatedAt).toHaveTextContent(/2020-01-01/i);

    expect(withTable.getByText(/test/i).closest('a')).toHaveAttribute('href', 'http://localhost:3000/test');
  });
});
