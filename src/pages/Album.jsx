import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    console.log(id);
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default Album;
