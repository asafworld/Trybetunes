import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musicsResult = await getMusics(id);
    this.setState({ musics: musicsResult });
  }

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <section>
          { musics.map((music, index) => {
            let albumMainInfo;
            if (index === 0) {
              albumMainInfo = (
                <section key={ music.collectionId }>
                  <img
                    alt={ `${music.collectionName} cover art` }
                    src={ music.artworkUrl100 }
                  />
                  <h1 data-testid="album-name">{ music.collectionName }</h1>
                  <h2 data-testid="artist-name">{ music.artistName }</h2>
                </section>
              );
            }
            return albumMainInfo;
          })}
        </section>
        <MusicCard id={ id } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
