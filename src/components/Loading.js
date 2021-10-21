// 2. Crie um formulário para identificação - Enquanto a informação da pessoa usuária é salva, uma mensagem com o texto Carregando... deve aparecer na tela. Dica: Você precisará dessa mensagem várias vezes no futuro, então é uma boa ideia criar um componente para ela ;)
import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (<span>Carregando...</span>);
  }
}
