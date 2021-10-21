// 7. Crie a lista de músicas do álbum selecionado - crie um componente chamado MusicCard
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
      loading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.manageSongInFavorites = this.manageSongInFavorites.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  componentDidMount() {
    this.checkFavorite();
  }

  onInputChange({ target }) {
    const { name, checked } = target;
    this.setState({ [name]: checked }, () => {
      this.manageSongInFavorites();
    });
  }

  async manageSongInFavorites() {
    const { track } = this.props;
    const { isFavorite } = this.state;
    this.setState({ loading: true });

    if (isFavorite) {
      await addSong(track);
    } else {
      await removeSong(track);
    }

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
        {/* 7. Crie a lista de músicas do álbum selecionado - o componente MusicCard deverá exibir o nome da música (propriedade trackName no objeto recebido pela API)... */}
        <span>{ trackName }</span>
        {/* ... e um player para tocar o preview da música (propriedade previewUrl no objeto recebido pela API). Para tocar o preview, você deve usar a tag audio do próprio HTML. Sua implementação é assim: */}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {/* Importante: lembre-se de colocar o atributo data-testid="audio-component" na tag audio de cada música listada. */}
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
