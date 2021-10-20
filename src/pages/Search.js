import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      isSearchButtonDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableSearchButton = this.enableSearchButton.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableSearchButton();
  }

  async onSearchButtonClick() {
    const { artist } = this.state;
    const response = await searchAlbumsAPI(artist);
    console.log(response);
  }

  enableSearchButton() {
    this.setState(({ artist }) => {
      const minInputLength = 2;
      return ({ isSearchButtonDisabled: artist.length < minInputLength });
    });
  }

  render() {
    const { artist, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div data-testid="page-artist">
          <input
            name="artist"
            value={ artist }
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
      </div>
    );
  }
}
