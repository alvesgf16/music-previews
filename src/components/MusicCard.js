import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target }) {
    const { name, checked } = target;
    this.setState({ [name]: checked });
  }

  render() {
    const { track } = this.props;
    const { trackId, trackName, previewUrl } = track;
    const { isFavorite } = this.state;
    return (
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
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};
