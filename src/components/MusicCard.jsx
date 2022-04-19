import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      musicAlbum: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    const { id } = this.props;
    this.setState({ loading: true });
    const musicsResult = await getMusics(id);
    this.setState({ musicAlbum: musicsResult, loading: false });
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
