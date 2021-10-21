// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };

    this.getFavorites = this.getFavorites.bind(this);
    // this.manageFavorites = this.manageFavorites.bind(this);
  }

  // Se você precisar carregar (recuperar) dados de um endpoint remoto (ou de um componente que simule isso ;)) (imediatamente após um componente ser montado), {componentDidMount()} é um bom lugar para instanciar (fazer) sua requisição * Fonte: https://pt-br.reactjs.org/docs/react-component.html#componentdidmount
  async componentDidMount() {
    // 12. Crie a lista de músicas favoritas - Ao entrar na página, recupere a lista de músicas favoritas.
    await this.getFavorites();
  }

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
      loading, // chave que controla a lógica de aparição do componente Loading
      favoriteSongs, // chave que guarda a lista de músicas favoritas
    } = this.state;

    // 12. Crie a lista de músicas favoritas - Estado inicial antes da requisição (loading = true): o componente <Loading /> é mostrado
    return (loading ? <Loading /> : (
      // 1. Crie as rotas necessárias para a aplicação - a rota /favorites deve renderizar um componente chamado Favorites. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-favorites"
      <div data-testid="page-favorites">
        {/* 3. Crie um componente de cabeçalho - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
        {/* 12. Crie a lista de músicas favoritas - Após receber o retorno da função getFavoriteSongs, utilize o componente MusicCard para renderizar a lista de músicas favoritas */}
        { favoriteSongs.map((song) => (
          <MusicCard
            key={ song.trackId }
            track={ song }
            // A propriedade isFavorite procura a música em questão na lista de músicas favoritas guardada no estado e retorna true se a encontrar
            isFavorite={ favoriteSongs
              .some((favSong) => favSong.trackId === song.trackId) }
            getFavorites={ this.getFavorites }
          />
        ))}
      </div>
    ));
  }
}
