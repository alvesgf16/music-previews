// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

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

  async componentDidMount() {
    const { match: { params: { id: album } } } = this.props;
    await this.getFavorites();
    await this.getSongsList(album);
  }

  async getSongsList(album) {
    const response = await getMusics(album);
    const albumInfo = response.find((object) => !(object.trackId));
    const songsList = response.filter((object) => object.trackId);
    this.setState({ albumInfo, songsList });
  }

  async getFavorites() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs });
  }

  render() {
    const { albumInfo, songsList, loading, favoriteSongs } = this.state;
    return (loading ? <Loading /> : (
      // 1. Crie as rotas necessárias para a aplicação - a rota /album/:id deve renderizar um componente chamado Album. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-album"
      <div data-testid="page-album">
        {/* 3. Crie um componente de cabeçalho - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
        <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
        <h3 data-testid="artist-name">{ albumInfo.artistName }</h3>
        { songsList.map((song) => (
          <MusicCard
            key={ song.trackId }
            track={ song }
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
