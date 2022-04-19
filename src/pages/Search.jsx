import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      disabled: true,
    };
    this.buttonAble = this.buttonAble.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
  }

  buttonAble() {
    const { searchValue } = this.state;
    const min = 1;
    if (searchValue.length >= min) {
      this.setState({ disabled: false });
    }
  }

  searchInputChange({ target }) {
    const { value } = target;
    this.setState({ searchValue: value }, this.buttonAble());
  }

  render() {
    const { disabled, searchValue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <label htmlFor="search-artist-input">
            <input
              data-testid="search-artist-input"
              id="search-artist-input"
              value={ searchValue }
              placeholder="Typer your artist or album"
              onChange={ this.searchInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
