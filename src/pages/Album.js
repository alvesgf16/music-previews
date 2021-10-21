// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

// 7. Crie a lista de músicas do álbum selecionado - Crie a lista dentro do componente Album, que é renderizado na rota /album/:id
export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumInfo: {},
      songsList: [],
      loading: false,
      favoriteSongs: [],
    };

    this.getSongsList = this.getSongsList.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  // Se você precisar carregar (recuperar) dados de um endpoint remoto (ou de um componente que simule isso ;)) (imediatamente após um componente ser montado), {componentDidMount()} é um bom lugar para instanciar (fazer) sua requisição * Fonte: https://pt-br.reactjs.org/docs/react-component.html#componentdidmount
  async componentDidMount() {
    // 9. e 10. Faça a requisição para recuperar as músicas favoritas ao entrar na página do Álbum e atualizar a lista após favoritar uma música - Ao entrar na página, recupere a lista de músicas favoritas.
    await this.getFavorites();

    const { match: { params: { id: album } } } = this.props; // 7. Crie a lista de músicas do álbum selecionado - Ao entrar na página, recupere o valor da id do álbum passada como parâmetro na URL) (Inspecione o componente Album para encontrar esse caminho)
    await this.getSongsList(album); // ... e utilize pra fazer uma requisição pela lista de músicas do álbum
  }

  async getSongsList(album) {
    // Faça a requisição utilizando a função getMusics do arquivo musicsAPI.js
    const response = await getMusics(album); // Essa função retorna um array de objetos cujo primeiro elemento contém informações sobre o álbum, enquanto os outros contêm os dados das faixas. Existem várias formas de trabalhar essas informações.
    const albumInfo = response.find((object) => !(object.trackId)); // Neste caso, o primeiro elemento foi usado para exibir as informações do álbum. Como não se trata de uma faixa (track), não possui uma trackId, e esse dado foi usado para achá-lo e para filtrar os outros elementos, gerando, assim, a lista de músicas.
    const songsList = response.filter((object) => object.trackId);
    this.setState({ albumInfo, songsList }); // Por fim, o primeiro elemento e a lista de músicas foram salvos em chaves diferentes do estado.
  }

  // 9. e 10. Faça a requisição para r e atualizar a lista após favoritar uma músicaecuperar as músicas favoritas ao entrar na página do Álbum
  async getFavorites() {
    // Enquanto aguarda a resposta da API, exiba a mensagem Carregando...
    this.setState({ loading: true });
    // Utilize a função getFavoriteSongs da favoriteSongsAPI para recuperar a lista de músicas favoritas.
    const favoriteSongs = await getFavoriteSongs();
    // Após receber o retorno da função getFavoriteSongs, a lista recebida pela função getFavoriteSongs deve ser salva no estado da sua aplicação
    this.setState({ loading: false, favoriteSongs });
  }

  render() {
    const {
      albumInfo, // chave que guarda o objeto com as informações do álbum
      songsList, // chave que guarda a lista de músicas filtrada
      loading, // chave que controla a lógica de aparição do componente Loading
      favoriteSongs, // chave que guarda a lista de músicas favoritas
    } = this.state;

    // 9. e 10. Faça a requisição para recuperar as músicas favoritas ao entrar na página do Álbum e atualizar a lista após favoritar uma música - Estado inicial antes da requisição (loading = true): o compomente <Loading /> é mostrado
    return (loading ? <Loading /> : (
      // 1. Crie as rotas necessárias para a aplicação - a rota /album/:id deve renderizar um componente chamado Album. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-album"
      <div data-testid="page-album">
        {/* 3. Crie um componente de cabeçalho - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
        {/* 7. Crie a lista de músicas do álbum selecionado - Exiba o nome do álbum na tela. Você pode usar qualquer tag HTML que faça sentido, desde que ela tenha o atributo data-testid="album-name" */}
        <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
        {/* Exiba o nome da banda ou artista na tela. Você pode usar qualquer tag HTML que faça sentido, desde que ela tenha o atributo data-testid="artist-name" */}
        <h3 data-testid="artist-name">{ albumInfo.artistName }</h3>
        {/* Liste todas as músicas do álbum na tela */}
        { songsList.map((song) => (
          <MusicCard
            key={ song.trackId }
            track={ song }
            // A propriedade isFavorite procura a música em questão na lista de músicas favoritas guardada no estado e retorna true se a encontrar
            isFavorite={ favoriteSongs
              .some((favSong) => favSong.trackId === song.trackId) }
          />
        ))}
      </div>
    ));
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
