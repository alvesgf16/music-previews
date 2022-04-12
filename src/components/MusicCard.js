// 7. - crie um componente chamado MusicCard
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

  // 9., 10., 11. e 12. - Após receber o retorno da função getFavoriteSongs, apenas as músicas favoritadas devem estar com o checkbox marcado como checked
  // Inicialmente, todas as músicas começam desmarcadas, mas, logo na montagem, há uma verificação da propriedade isFavorite (ver componente Album)
  componentDidMount() {
    this.checkFavorite();
  }

  // Função que verifica o valor da propriedade isFavorite (ver componente Album) e o atualiza
  checkFavorite() {
    const { isFavorite } = this.props;
    this.setState({ isFavorite });
  }

  render() {
    const {
      track: { trackId, trackName, previewUrl }, // Propriedades do objeto recebido pela API
      onInputChange,
    } = this.props;
    const {
      isFavorite, // chave que controla se a checkbox está marcada
    } = this.state;

    return (
      <div>
        {/* 7. - o componente MusicCard deverá exibir o nome da música (propriedade trackName no objeto recebido pela API)... */}
        <span>{ trackName }</span>
        {/* ... e um player para tocar o preview da música (propriedade previewUrl no objeto recebido pela API). Para tocar o preview, você deve usar a tag audio do próprio HTML. Sua implementação é assim: */}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {/* Importante: lembre-se de colocar o atributo data-testid="audio-component" na tag audio de cada música listada. */}
        {/* 8. - No componente MusicCard, crie uma label com o texto Favorita.... */}
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          {/*  ... e um input, que deve ser do tipo checkbox para marcar as músicas favoritas, e possuir o atributo data-testid={`checkbox-music-${trackId}`}, onde trackId é a propriedade trackId do objeto recebido pela API */}
          <input
            name="isFavorite"
            type="checkbox"
            checked={ isFavorite }
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
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
