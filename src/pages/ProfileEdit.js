// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import Header from '../components/Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      // 1. Crie as rotas necessárias para a aplicação - a rota /profile/edit deve renderizar um componente chamado ProfileEdit. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-profile-edit"
      <div data-testid="page-profile-edit">
        <Header />
      </div>
    );
  }
}
