import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    // const { id } = this.props.match.params
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
      </div>
    );
  }
}

export default Album;
