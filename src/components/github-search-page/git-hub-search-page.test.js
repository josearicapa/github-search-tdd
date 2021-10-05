import React from 'react'
import {render, screen, fireEvent, waitFor, within} from '@testing-library/react'
import GithubSearchPage from './git-hub-search-page'

beforeEach(() => render(<GithubSearchPage />))

describe('when the GitHub Search Page is mounted', () => {
  it('should must display the title', () => {
    expect(screen.getByRole('heading', {name: /github repositories list/i})).toBeInTheDocument();
  })

  it('should be have an input text with label "filter by" field in order to do the search.', () => {
    expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument();
  })

  it('should be have a Search button', () => {
    expect(screen.getByRole('button', {name: /search/i})).toBeInTheDocument();
  })

  it('should be an initial message "Please provide a search option and click in the search button"', () => {
    expect(screen.getByText(/Please provide a search option and click in the search button/i)).toBeInTheDocument();
  })
})

describe('when the developer does a search', () => {
  it('the search should be disabled until the search is done', async () => {
    expect(screen.getByRole('button', {name: /search/i})).not.toBeDisabled()
    fireEvent.click(screen.getByRole('button', {name: /search/i}));
    await waitFor(() =>
      expect(screen.getByRole('button', {name: /search/i})).toBeDisabled(),
    );
  });

  it('The data should be displayed as a sticky table', async () => {   
    fireEvent.click(screen.getByRole('button', {name: /search/i}));
    await waitFor(() =>      
      expect(screen.queryByText(/Please provide a search option and click in the search button/i)).not.toBeInTheDocument()
    );
    expect(screen.getByRole('table')).toBeDefined();    
  });

  it('The header table should contain: Repository, stars, forks, open issues and updated at', async () => {
    fireEvent.click(screen.getByRole('button', {name: /search/i}));

    const table = await screen.findByRole('table');
    // within permite hacer consultas solo de un determinado nodo
    const tableHeaders = within(table).getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(5);
    expect(tableHeaders[0]).toHaveTextContent(/repository/i);
    expect(tableHeaders[1]).toHaveTextContent(/start/i);
    expect(tableHeaders[2]).toHaveTextContent(/forks/i);
    expect(tableHeaders[3]).toHaveTextContent(/open issues/i);
    expect(tableHeaders[4]).toHaveTextContent(/updated at/i);
  });
 
})
