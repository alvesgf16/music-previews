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

  // Event handler genérico apenas para checkbox * Fonte: https://pt-br.reactjs.org/docs/forms.html - seção Manipulando Múltiplos Inputs
  onInputChange({ target }) {
    const { name, checked } = target;
    this.setState({ [name]: checked }, () => {
      this.manageSongInFavorites();
    });
  }

  // 8. e 11. Crie o mecanismo para adicionar/remover músicas na lista de músicas favoritas
  async manageSongInFavorites() {
    const { track } = this.props; // Propriedade que guarda o objeto da faixa, obtido da lista retornada por getMusics
    const { isFavorite } = this.state;
    // Enquanto aguarda o retorno da função addSong/removeSong, renderize a mensagem de Carregando...
    this.setState({ loading: true });

    if (isFavorite) {
      // Para adicionar uma música a lista de favoritas, utilize a função addSong da favoriteSongsAPI. Você deve passar para essa função um objeto no mesmo formato que você recebe da API getMusics
      await addSong(track);
    } else {
      // Ao clicar em uma música que já está marcada como favorita, ela deve ser removida da lista de músicas favoritas. Para isso você deve usar a função removeSong da favoriteSongsAPI. Essa API espera receber um objeto no mesmo formato que foi passado anteriormente para a função addSong
      await removeSong(track);
    }

    this.setState({ loading: false });
  }

  checkFavorite() {
    const { isFavorite } = this.props;
    this.setState({ isFavorite });
  }

  render() {
    const { track: { trackId, trackName, previewUrl } } = this.props; // Propriedades do objeto recebido pela API
    const {
      isFavorite, // chave que controla se a checkbox está marcada
      loading, // chave que controla a lógica de aparição do componente Loading
    } = this.state;

    // 8. e 11. Crie o mecanismo para adicionar/remover músicas na lista de músicas favoritas Estado intermediário entre o marcar/desmarcar da checkbox e a requisição à API (loading = true): o compomente <Loading /> é mostrado
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
        {/* 8. Crie o mecanismo para adicionar músicas na lista de músicas favoritas - No componente MusicCard, crie um input, que deve conter uma label com o texto Favorita... */}
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          {/*  ... ser do tipo checkbox para marcar as músicas favoritas, e possuir o atributo data-testid={`checkbox-music-${trackId}`}, onde trackId é a propriedade trackId do objeto recebido pela API */}
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
