import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritesList: [],
      checked: true,
    };
    this.removeTheSong = this.removeTheSong.bind(this);
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const savedList = await getFavoriteSongs();
    this.setState({ loading: false, favoritesList: savedList });
  }

  removeTheSong = async (favorite) => {
    this.setState({ loading: true, checked: false });
    await removeSong(favorite);
    const savedList = await getFavoriteSongs();
    this.setState({ loading: false, favoritesList: savedList });
  }

  render() {
    const { loading, favoritesList, checked } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        { loading ? <Loading /> : (
          <ul>
            { favoritesList.map((favorite) => {
              const { trackName, previewUrl, trackId } = favorite;
              const favoriteInfo = (
                <li key={ trackId }>
                  <h3>{ trackName }</h3>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <form>
                    <label htmlFor={ `checkbox-music-${trackId}` }>
                      Favorita
                      <input
                        data-testid={ `checkbox-music-${trackId}` }
                        onChange={ () => this.removeTheSong(favorite) }
                        checked={ checked }
                        type="checkbox"
                        id={ `checkbox-music-${trackId}` }
                      />
                    </label>
                  </form>
                </li>
              );
              return favoriteInfo;
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default Favorites;
