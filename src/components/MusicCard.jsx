import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from '../pages/Loading';
import { addSong,
  getFavoriteSongs,
  removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      musicAlbum: [],
      loading: false,
      favorite: [],
    };

    this.favoriteSong = this.favoriteSong.bind(this);
    this.checkedChanged = this.checkedChanged.bind(this);
  }

  componentDidMount = async () => {
    const { id } = this.props;
    this.setState({ loading: true });
    const savedFaves = await getFavoriteSongs();
    const musicsResult = await getMusics(id);
    this.setState({ musicAlbum: musicsResult, loading: false, favorite: savedFaves });
  }

  favoriteSong = async (track) => {
    const { favorite } = this.state;
    const verification = favorite.some((each) => each.trackId === track.trackId);
    if (verification) {
      const newArr = favorite.filter((element) => element.trackId !== track.trackId);
      this.setState({ loading: true });
      const removedSong = await removeSong(track);
      console.log(removedSong);
      this.setState({ loading: false });
      this.setState({ favorite: newArr });
    } else {
      this.setState({ loading: true });
      const addedSong = await addSong(track);
      console.log(addedSong);
      this.setState({ loading: false });
      this.setState((prevState) => ({ favorite: [...prevState.favorite, track] }));
    }
  }

  checkedChanged(trackId) {
    const { favorite } = this.state;
    const checkedResult = favorite.some((track) => track.trackId === trackId);
    return checkedResult;
  }

  render() {
    const { musicAlbum, loading } = this.state;
    return (
      <section>
        { loading ? <Loading /> : (
          <ul>
            { musicAlbum.map((track, index) => {
              const { trackName, previewUrl, trackId } = track;
              let musicInfo;
              if (index !== 0) {
                musicInfo = (
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
                          checked={ this.checkedChanged(trackId) }
                          onClick={ () => this.favoriteSong(track) }
                          type="checkbox"
                          id={ `checkbox-music-${trackId}` }
                        />
                      </label>
                    </form>
                  </li>
                );
              }
              return musicInfo;
            })}
          </ul>)}
      </section>
    );
  }
}

MusicCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MusicCard;
