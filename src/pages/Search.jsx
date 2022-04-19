import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      inputLastValue: '',
      disabled: true,
      loading: false,
      resultFull: false,
      resultEmpty: false,
      artist: [],
    };
    this.buttonAble = this.buttonAble.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
    this.search = this.search.bind(this);
  }

  search = async () => {
    const { searchValue } = this.state;
    this.setState({ loading: true, inputLastValue: searchValue });
    const albumArray = await searchAlbumsAPI(searchValue);
    if (albumArray.length === 0) {
      this.setState({
        searchValue: '',
        loading: false,
        resultEmpty: true,
        resultFull: false,
        artist: albumArray });
    } else {
      this.setState({
        searchValue: '',
        loading: false,
        resultFull: true,
        resultEmpty: false,
        artist: albumArray });
    }
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
    const {
      disabled,
      searchValue,
      loading,
      resultEmpty,
      resultFull,
      artist,
      inputLastValue } = this.state;
    console.log(artist);
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        { loading ? <Loading /> : (
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
              onClick={ this.search }
              disabled={ disabled }
            >
              Search
            </button>
          </form>)}
        { resultEmpty && (<h2>Nenhum álbum foi encontrado</h2>) }

        { resultFull && (
          <section>
            <h2>
              Resultado de álbuns de:
              {' '}
              { inputLastValue }
            </h2>
            <ul>
              { artist.map((album) => {
                const { collectionId,
                  collectionName,
                  artistName,
                  artworkUrl100 } = album;
                const lines = (
                  <li key={ collectionId }>
                    <img src={ artworkUrl100 } alt={ `${collectionName} art cover` } />
                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      { collectionName }
                    </Link>
                    <h4>{ artistName }</h4>
                  </li>);
                return lines;
              })}
            </ul>
          </section>
        )}
      </div>
    );
  }
}

export default Search;
