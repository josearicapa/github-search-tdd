import React from 'react';
import {  
  render,
  screen    
} from '@testing-library/react';
import GithubSearchPage from './git-hub-search-page';

beforeEach(() => render(<GithubSearchPage />));

describe('when the GitHub Search Page is mounted', () => {
  it('should must display the title', () => {
    expect(
      screen.getByRole('heading', {name: /github repositories list/i}),
    ).toBeInTheDocument();
  });

  it('should An input text with label "filter by" field in order to do the search.', () => {
    expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument();
  });

  it('should be a Search button', () => {
    expect(screen.getByRole('button', {name: /search/i})).toBeInTheDocument();
  });
});