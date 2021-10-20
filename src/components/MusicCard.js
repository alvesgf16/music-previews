import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
      loading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.addSongToFavorites = this.addSongToFavorites.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  componentDidMount() {
    this.checkFavorite();
  }

  onInputChange({ target }) {
    const { name, checked } = target;
    this.setState({ [name]: checked }, () => {
      const { isFavorite } = this.state;
      if (isFavorite) this.addSongToFavorites();
    });
  }

  async addSongToFavorites() {
    const { track } = this.props;
    this.setState({ loading: true });
    await addSong(track);
    this.setState({ loading: false });
  }

  checkFavorite() {
    const { isFavorite } = this.props;
    this.setState({ isFavorite });
  }

  render() {
    const { track } = this.props;
    const { trackId, trackName, previewUrl } = track;
    const { isFavorite, loading } = this.state;

    return (loading ? <Loading /> : (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            name="isFavorite"
            type="checkbox"
            checked={ isFavorite }
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.onInputChange }
          />
        </label>
      </div>
    ));
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
