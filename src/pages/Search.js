// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      isSearchButtonDisabled: true,
      loading: false,
      albums: [],
      artist: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableSearchButton = this.enableSearchButton.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableSearchButton();
  }

  onSearchButtonClick() {
    const { input } = this.state;
    this.setState({ artist: input }, () => {
      const { artist } = this.state;
      this.searchAlbums(artist);
      this.setState({ input: '' });
    });
  }

  async searchAlbums(artist) {
    this.setState({ loading: true, albums: [] });
    const response = await searchAlbumsAPI(artist);
    this.setState({ loading: false, albums: response });
  }

  enableSearchButton() {
    this.setState(({ input }) => {
      const minInputLength = 2;
      return ({ isSearchButtonDisabled: input.length < minInputLength });
    });
  }

  render() {
    const { input, isSearchButtonDisabled, loading, albums, artist } = this.state;

    return (
      // 1. Crie as rotas necessárias para a aplicação - a rota /search deve renderizar um componente chamado Search. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-search"
      <div data-testid="page-search">
        {/* 3. Crie um componente de cabeçalho - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
        { loading ? <Loading /> : (
          <div>
            <input
              name="input"
              value={ input }
              type="text"
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
              onClick={ this.onSearchButtonClick }
            >
              Pesquisar
            </button>
          </div>
        ) }
        { artist && (albums.length > 0 ? (
          <div>
            <h3>{`Resultado de álbuns de: ${artist}`}</h3>
            { albums.map((album) => (
              <AlbumCard key={ album.collectionId } album={ album } />
            ))}
          </div>
        ) : <h2>Nenhum álbum foi encontrado</h2>) }
      </div>
    );
  }
}
