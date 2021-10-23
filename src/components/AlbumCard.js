// 6. - Liste os álbuns retornados. A API irá retorna um array de objetos.
// Crie um componente para poder definir como os objetos retornados serão exibidos
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AlbumCard extends Component {
  render() {
    // Cada objeto terá a seguinte estrutura (editada apenas com o necessário):
    const { album: {
      artistName, // nome do artista
      collectionId, // id do álbum
      collectionName, // nome do álbum
      artworkUrl100, // url para imagem da capa do álbum
    } } = this.props;
    return (
      <div>
        {/*
          * Ao listar os álbuns, crie um link em cada card para redirecionar para a página do álbum. Este link deve ter o atributo data-testid={`link-to-album-${collectionId}`}. Onde collectionId é o valor da propriedade de cada Álbum.
          * Este link deve redirecionar para a rota /album/:id, onde :id é o valor da propriedade collectionId de cada Álbum da lista recebida pela API.
        */}
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ `${collectionName} cover` } />
          <h4>{ collectionName }</h4>
          <p>{ artistName }</p>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};
