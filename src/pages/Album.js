// 1. - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

// 7. - Crie a lista dentro do componente Album, que é renderizado na rota /album/:id
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

  // Se você precisar carregar (recuperar) dados de um endpoint remoto (ou de um componente que simule isso ;)) (imediatamente após um componente ser montado), {componentDidMount()} é um bom lugar para instanciar (fazer) sua requisição * Fonte: https://pt-br.reactjs.org/docs/react-component.html#componentdidmount
  async componentDidMount() {
    const { match: { params: { id: album } } } = this.props; // 7. - Ao entrar na página, recupere o valor da id do álbum passada como parâmetro na URL) (Inspecione o componente Album para encontrar esse caminho)
    await this.getSongsList(album); // ... e utilize pra fazer uma requisição pela lista de músicas do álbum

    // 9. - Ao entrar na página, recupere a lista de músicas favoritas.
    await this.getFavorites();
  }

  // 8., 10. e 11. - Event handler genérico apenas para checkbox * Fonte: https://pt-br.reactjs.org/docs/forms.html - seção Manipulando Múltiplos Inputs
  onInputChange(event, song) {
    const { target } = event;
    const { name, checked } = target;
    this.setState({ [name]: checked }, () => {
      this.manageSongInFavorites(checked, song);
    });
  }

  async getSongsList(album) {
    // 7. - Faça a requisição utilizando a função getMusics do arquivo musicsAPI.js
    const response = await getMusics(album); // Essa função retorna um array de objetos cujo primeiro elemento contém informações sobre o álbum, enquanto os outros contêm os dados das faixas. Existem várias formas de trabalhar essas informações.
    const albumInfo = response.find((object) => !(object.trackId)); // Neste caso, o primeiro elemento foi usado para exibir as informações do álbum. Como não se trata de uma faixa (track), não possui uma trackId, e esse dado foi usado para achá-lo e para filtrar os outros elementos, gerando, assim, a lista de músicas.
    const songsList = response.filter((object) => object.trackId);
    this.setState({ albumInfo, songsList }); // Por fim, o primeiro elemento e a lista de músicas foram salvos em chaves diferentes do estado.
  }

  // 9. - Função que faz a requisição à API, pois não é possível fazer isso corretamente direto do componentDidMount
  async getFavorites() {
    // 9. e 10. - Enquanto aguarda a resposta da API, exiba a mensagem Carregando...
    this.setState({ loading: true });
    // Utilize a função getFavoriteSongs da favoriteSongsAPI para recuperar a lista de músicas favoritas.
    const favoriteSongs = await getFavoriteSongs();
    // Atualize o estado da aplicação salvando a lista recebida pela função getFavoriteSongs
    this.setState({ loading: false, favoriteSongs });
  }

  async manageSongInFavorites(checked, song) {
    // 8. e 11. - Enquanto aguarda o retorno da função addSong/removeSong, renderize a mensagem de Carregando...
    this.setState({ loading: true });

    if (checked) {
      // 8. - Para adicionar uma música a lista de favoritas, utilize a função addSong da favoriteSongsAPI. Você deve passar para essa função um objeto no mesmo formato que você recebe da API getMusics
      await addSong(song);
    } else {
      // 11. - Ao clicar em uma música que já está marcada como favorita, ela deve ser removida da lista de músicas favoritas. Para isso você deve usar a função removeSong da favoriteSongsAPI. Essa API espera receber um objeto no mesmo formato que foi passado anteriormente para a função addSong
      await removeSong(song);
    }

    // 10. e 11. - Ao favoritar/remover uma música, aguarde o retorno da função addSong (que já foi implementada no requisito 8) e recupere a lista de músicas favoritas (reutilizando a função implementada no requisito 9)
    await this.getFavorites();

    this.setState({ loading: false });
  }

  render() {
    const {
      albumInfo, // chave que guarda o objeto com as informações do álbum
      songsList, // chave que guarda a lista de músicas filtrada
      loading, // chave que controla a lógica de aparição do componente Loading
      favoriteSongs, // chave que guarda a lista de músicas favoritas
    } = this.state;

    return (
      // 1. - a rota /album/:id deve renderizar um componente chamado Album. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-album"
      <div data-testid="page-album">
        {/* 3. - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
        {/* 9. e 10. - Estado inicial antes da requisição (loading = true): o componente <Loading /> é mostrado */}
        { loading ? <Loading /> : (
          <main>
            {/* 7. - Exiba o nome do álbum na tela. Você pode usar qualquer tag HTML que faça sentido, desde que ela tenha o atributo data-testid="album-name" */}
            <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
            {/* Exiba o nome da banda ou artista na tela. Você pode usar qualquer tag HTML que faça sentido, desde que ela tenha o atributo data-testid="artist-name" */}
            <h3 data-testid="artist-name">{ albumInfo.artistName }</h3>
            {/* Liste todas as músicas do álbum na tela */}
            { songsList.map((song) => (
              <MusicCard
                key={ song.trackId }
                track={ song }
                onInputChange={ (event) => this.onInputChange(event, song) }
                // 9., 10. e 11. - Após receber o retorno da função getFavoriteSongs, apenas as músicas favoritadas devem estar com o checkbox marcado como checked
                // A propriedade isFavorite procura a música em questão na lista de músicas favoritas guardada no estado e retorna true se a encontrar
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
