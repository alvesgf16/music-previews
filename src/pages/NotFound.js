// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      // 1. Crie as rotas necessárias para a aplicação - para qualquer outra rota não mapeada, deve ser renderizado um componente chamado NotFound. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-not-found"
      <div data-testid="page-not-found">
        a
      </div>
    );
  }
}
