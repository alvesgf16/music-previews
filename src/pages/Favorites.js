import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import TrackCard from '../components/TrackCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.manageFavorites = this.manageFavorites.bind(this);
  }

  async componentDidMount() {
    await this.getFavorites();
  }

  onInputChange(event, song) {
    const { target } = event;
    const { name, checked } = target;
    this.setState({ [name]: checked }, () => {
      this.manageFavorites(checked, song);
    });
  }

  async getFavorites() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs });
  }

  async manageFavorites(checked, song) {
    this.setState({ loading: true });

    if (!checked) {
      await removeSong(song);
    }

    await this.getFavorites();

    this.setState({ loading: false });
  }

  render() {
    const {
      loading,
      favoriteSongs,
    } = this.state;

    return (
      <div>
        <Header />
        { loading ? <Loading /> : (
          favoriteSongs.map((song) => (
            <TrackCard
              key={ song.trackId }
              track={ song }
              isFavorite={ favoriteSongs
                .some((favSong) => favSong.trackId === song.trackId) }
              onInputChange={ (event) => this.onInputChange(event, song) }
            />
          ))
        ) }
      </div>
    );
  }
}
