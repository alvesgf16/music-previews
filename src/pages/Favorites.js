// 1. - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

// 12. - Crie a lista dentro do componente Favorites, que é renderizado na rota /favorites
export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.manageFavorites = this.manageFavorites.bind(this);
  }

  // Se você precisar carregar (recuperar) dados de um endpoint remoto (ou de um componente que simule isso ;)) (imediatamente após um componente ser montado), {componentDidMount()} é um bom lugar para instanciar (fazer) sua requisição * Fonte: https://pt-br.reactjs.org/docs/react-component.html#componentdidmount
  async componentDidMount() {
    // 12. - Ao entrar na página, recupere a lista de músicas favoritas.
    await this.getFavorites();
  }

  // Event handler genérico apenas para checkbox * Fonte: https://pt-br.reactjs.org/docs/forms.html - seção Manipulando Múltiplos Inputs
  onInputChange(event, song) {
    const { target } = event;
    const { name, checked } = target;
    this.setState({ [name]: checked }, () => {
      this.manageFavorites(checked, song);
    });
  }

  // Função que faz a requisição à API, pois não é possível fazer isso corretamente direto do componentDidMount
  async getFavorites() {
    // Enquanto aguarda a resposta da API, exiba a mensagem Carregando...
    this.setState({ loading: true });
    // Utilize a função getFavoriteSongs da favoriteSongsAPI para recuperar a lista de músicas favoritas E para atualizar a lista após remover uma música
    const favoriteSongs = await getFavoriteSongs();
    // Após receber o retorno da função getFavoriteSongs, a lista recebida pela função getFavoriteSongs deve ser salva no estado da sua aplicação
    this.setState({ loading: false, favoriteSongs });
  }

  //
  async manageFavorites(checked, song) {
    // Enquanto aguarda a resposta da API, renderize a mensagem de Carregando...
    this.setState({ loading: true });

    if (!checked) {
      // Nesta página deve ser possível desfavoritar as músicas. Para isso utilize a função removeSong da favoriteSongsAPI
      await removeSong(song);
    }

    // Após remover a música, atualize a lista
    await this.getFavorites();

    this.setState({ loading: false });
  }

  render() {
    const {
      loading, // chave que controla a lógica de aparição do componente Loading
      favoriteSongs, // chave que guarda a lista de músicas favoritas
    } = this.state;

    // 12. Crie a lista de músicas favoritas - Estado inicial antes da requisição (loading = true): o componente <Loading /> é mostrado
    return (
      // 1. Crie as rotas necessárias para a aplicação - a rota /favorites deve renderizar um componente chamado Favorites. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-favorites"
      <div data-testid="page-favorites">
        {/* 3. Crie um componente de cabeçalho - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
        { loading ? <Loading /> : (
          // 12. - Após receber o retorno da função getFavoriteSongs, utilize o componente MusicCard para renderizar a lista de músicas favoritas
          favoriteSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              track={ song }
              // Após receber o retorno da função getFavoriteSongs, apenas as músicas favoritadas devem estar com o checkbox marcado como checked
              // A propriedade isFavorite procura a música em questão na lista de músicas favoritas guardada no estado e retorna true se a encontrar
              isFavorite={ favoriteSongs
                .some((favSong) => favSong.trackId === song.trackId) }
              onInputChange={ (event) => this.onInputChange(event, song) }
            />
          ))
        ) }
      </div>
    );
  }
}
