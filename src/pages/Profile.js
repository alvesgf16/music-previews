// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    return (
      // 1. Crie as rotas necessárias para a aplicação - a rota /profile deve renderizar um componente chamado Profile. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-profile"
      <div data-testid="page-profile">
        {/* 3. Crie um componente de cabeçalho - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
      </div>
    );
  }
}
