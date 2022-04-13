import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import TrackCard from '../components/TrackCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumInfo: {},
      songsList: [],
      loading: false,
      favoriteSongs: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.getSongsList = this.getSongsList.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.manageSongInFavorites = this.manageSongInFavorites.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id: album } } } = this.props;
    await this.getSongsList(album);

    await this.getFavorites();
  }

  onInputChange(event, song) {
    const { target } = event;
    const { name, checked } = target;
    this.setState({ [name]: checked }, () => {
      this.manageSongInFavorites(checked, song);
    });
  }

  async getSongsList(album) {
    const response = await getMusics(album);
    const albumInfo = response.find((object) => !(object.trackId));
    const songsList = response.filter((object) => object.trackId);
    this.setState({ albumInfo, songsList });
  }

  async getFavorites() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs });
  }

  async manageSongInFavorites(checked, song) {
    this.setState({ loading: true });

    if (checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }

    await this.getFavorites();

    this.setState({ loading: false });
  }

  render() {
    const {
      albumInfo,
      songsList,
      loading,
      favoriteSongs,
    } = this.state;

    return (
      <div>
        <Header />
        { loading ? <Loading /> : (
          <main>
            <h2>{ albumInfo.collectionName }</h2>
            <h3>{ albumInfo.artistName }</h3>
            { songsList.map((song) => (
              <TrackCard
                key={ song.trackId }
                track={ song }
                onInputChange={ (event) => this.onInputChange(event, song) }
                isFavorite={ favoriteSongs
                  .some((favSong) => favSong.trackId === song.trackId) }
              />
            ))}
          </main>
        )}
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
