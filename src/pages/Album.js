import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumInfo: {},
      songsList: [],
    };

    this.getSongsList = this.getSongsList.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id: album } } } = this.props;
    this.getSongsList(album);
  }

  async getSongsList(album) {
    const songsList = await getMusics(album);
    const albumInfo = songsList.shift();
    this.setState({ albumInfo, songsList });
  }

  render() {
    const { albumInfo, songsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
        <h3 data-testid="artist-name">{ albumInfo.artistName }</h3>
        { songsList.map((song) => (
          <MusicCard key={ song.trackId } track={ song } />
        ))}
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
