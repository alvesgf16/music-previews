import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
    };

    this.checkFavorite = this.checkFavorite.bind(this);
  }

  componentDidMount() {
    this.checkFavorite();
  }

  checkFavorite() {
    const { isFavorite } = this.props;
    this.setState({ isFavorite });
  }

  render() {
    const {
      track: { trackId, trackName, previewUrl },
      onInputChange,
    } = this.props;
    const {
      isFavorite,
    } = this.state;

    return (
      <div>
        <span>{ trackName }</span>
        <audio src={ previewUrl } controls>
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
            onChange={ onInputChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.string,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
