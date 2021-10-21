// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

// 5. Crie o formulário para pesquisar artistas - Crie o formulário dentro do componente Search, que é renderizado na rota /search
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

  // Event handler genérico sem checkbox * Fonte: https://pt-br.reactjs.org/docs/forms.html - seção Manipulando Múltiplos Inputs
  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableSearchButton();
  }

  // 6. Faça a requisição para pesquisar artistas - Função ativada ao clicar no botão Pesquisar
  onSearchButtonClick() {
    const { input } = this.state; // Recupera o valor do input do estado...
    this.setState({ artist: input }, () => { // ... e salva ele em outra chave do estado...
      this.setState({ input: '' }); // ... para em seguida poder limpar o valor do input...

      const { artist } = this.state; // ... e ainda assim ter o valor para usar...
      this.searchAlbums(artist); // ... na requisição à API
    });
  }

  // Função que faz a requisição à API, pois não é possível fazer isso corretamente direto do setState
  async searchAlbums(artist) {
    // Enquanto aguarda a resposta da API, esconda o input e o botão de pesquisa e exiba a mensagem Carregando... na tela.
    this.setState({ loading: true, albums: [] });
    // (...) faça uma requisição utilizando a função do arquivo searchAlbumsAPIs.js. Lembre-se que essa função espera receber uma string com o nome da banda ou artista (que foi o valor digitado no input)
    const response = await searchAlbumsAPI(artist);
    this.setState({ loading: false, albums: response });
  }

  // Função que controla se o botão de Pesquisar está habilitado
  enableSearchButton() {
    this.setState(({ input }) => { // Recupera o valor do input do estado, controlado pela função onInputChange
      const minInputLength = 2;
      return ({ isSearchButtonDisabled: input.length < minInputLength }); // Altera a propriedade disabled do botão pelo valor da comparação entre o tamanho do input e o tamanho mínimo requerido. Se o tamanho do input for menor, retorna true e o botão fica desabilitado.
    });
  }

  render() {
    const {
      input, // chave que guarda o que é digitado no input
      isSearchButtonDisabled, // chave que controla se o botão está (des)habilitado, controlada pela função enableSearchButton
      loading, // chave que controla a lógica de aparição do componente Loading
      albums, // chave que guarda a lista de álbuns obtida após a requisição
      artist, // chave que guarda o valor a ser pesquisado ao se clicar no botão para permitir que o input seja limpo
    } = this.state;

    return (
      // 1. Crie as rotas necessárias para a aplicação - a rota /search deve renderizar um componente chamado Search. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-search"
      <div data-testid="page-search">
        {/* 3. Crie um componente de cabeçalho - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
        {/* 6. Faça a requisição para pesquisar artistas - Estado intermediário entre o clicar do botão e a requisição à API (loading = true, artist = true (valor obtido), albums.length = 0): o compomente <Loading /> é mostrado */}
        { loading ? <Loading /> : (
          // Estado inicial (loading = false, artist = false (string vazia), album.length = 0): o conteúdo normal é mostrado
          // 5. Crie o formulário para pesquisar artistas - Este formulário deve conter um input e um botão para que seja possível pesquisar os álbuns de uma banda ou artista.
          <div>
            {/* Crie um campo para pessoa digitar o nome da banda ou artista a ser pesquisada. Esse campo deve ter o atributo data-testid="search-artist-input" */}
            <input
              name="input"
              value={ input }
              type="text"
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
            />
            {/* Crie um botão com o texto Pesquisar. Esse botão deve ter o atributo data-testid="search-artist-button" */}
            <button
              type="button"
              data-testid="search-artist-button"
              // O botão só deve estar habilitado caso o nome do artista tenha 2 ou mais caracteres (crie um estado para controlar isso).
              disabled={ isSearchButtonDisabled }
              // 6. Faça a requisição para pesquisar artistas - Ao clicar no botão de Pesquisar (...) => seguir para onSearchButtonClick
              onClick={ this.onSearchButtonClick }
            >
              Pesquisar
            </button>
          </div>
        ) }
        {/* 6. Faça a requisição para pesquisar artistas - Estado final possível 1 em que o artista foi encontrado e possui álbuns para serem mostrados (loading = false, artist = true (valor obtido), albums.length > 0): exibe texto e álbuns */}
        { artist
          && (albums.length > 0 ? (
            <div>
              {/* Após receber a resposta da requisição exibir na tela o texto Resultado de álbuns de: <artista>, onde <artista> é o nome que foi digitado no input. */}
              <h3>{`Resultado de álbuns de: ${artist}`}</h3>
              {/* Liste os álbuns retornados. A API irá retornar um array de objetos */}
              { albums.map((album) => (
                <AlbumCard key={ album.collectionId } album={ album } />
              ))}
            </div>
            // Estado final possível 2 em que o artista não foi encontrado ou não possui álbuns para serem mostrados (loading = false, artist = true (valor obtido), albums.length = 0): exibe mensagem
            // Se nenhum álbum for encontrado para o nome pesquisado, a API irá retornar um array vazio. Nesse caso, a mensagem Nenhum álbum foi encontrado deverá ser exibida
          ) : <h2>Nenhum álbum foi encontrado</h2>) }
      </div>
    );
  }
}
