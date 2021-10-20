import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { track: {
      trackName,
      previewUrl,
    } } = this.props;
    return (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};
