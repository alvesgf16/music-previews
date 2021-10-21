// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      isSaveButtonDisabled: true,
      loading: 0,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableSaveButton = this.enableSaveButton.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
  }

  // Event handler genérico sem checkbox * Fonte: https://pt-br.reactjs.org/docs/forms.html - seção Manipulando Múltiplos Inputs
  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableSaveButton();
  }

  // 2. Crie um formulário para identificação - Função ativada ao clicar no botão Entrar
  async onSaveButtonClick() {
    const { login } = this.state;
    // Enquanto a informação da pessoa usuária é salva, uma mensagem com o texto Carregando... deve aparecer na tela. (mais explicações no render)
    this.setState((prevState) => ({ loading: prevState.loading + 1 }));
    // (...) utilize a função createUser da userAPI para salvar o nome digitado.
    await createUser({ name: login }); // A função createUser espera receber como argumento um objeto com as informações da pessoa (que, por enquanto, restringem-se ao login digitado no input)
    // Após a informação ter sido salva, faça um redirect para a rota /search (mais explicações no render)
    this.setState((prevState) => ({ loading: prevState.loading + 1 }));
  }

  // Função que controla se o botão de Entrar está habilitado
  enableSaveButton() {
    this.setState(({ login }) => { // Recupera o valor do login do estado, controlado pela função onInputChange
      const minInputLength = 3;
      return ({ isSaveButtonDisabled: login.length < minInputLength }); // Altera a propriedade disabled do botão pelo valor da comparação entre o tamanho do login e o tamanho mínimo requerido. Se o tamanho do login for menor, retorna true e o botão fica desabilitado.
    });
  }

  render() {
    const {
      login, // chave que guarda o que é digitado no input
      isSaveButtonDisabled, // chave que controla se o botão está (des)habilitado, controlada pela função enableSaveButton
      loading, // chave que controla a lógica de aparição do componente Loading
    } = this.state;

    // Estado final após a requisição à API (loading = 1 + 1): redirecionamento para a rota /search
    if (loading === 2) {
      return (<Redirect to="/search" />);
    }

    // Estado intermediário entre o clicar do botão e a requisição à API (loading = 0 + 1): o compomente <Loading /> é mostrado
    if (loading === 1) {
      return (<Loading />);
    }

    // Estado inicial (loading = 0): o conteúdo normal é mostrado
    return (
      // 1. Crie as rotas necessárias para a aplicação - a rota / deve renderizar um componente chamado Login. Este componente deve ter uma div com o atributo data-testid="page-login" que envolva todo seu conteúdo
      <div data-testid="page-login">
        {/* 2. Crie um formulário para identificação - Dentro do componente Login, que é renderizado na rota /, crie um formulário para que a pessoa usuária se identifique com um nome. */}
        <form>
          {/* Você deve criar um campo para que a pessoa usuária insira seu nome. Este campo deverá ter o atributo data-testid="login-name-input" */}
          <input
            name="login"
            value={ login }
            type="text"
            data-testid="login-name-input"
            onChange={ this.onInputChange }
          />
          {/* Crie um botão com o texto Entrar. Este botão deverá ter o atributo data-testid="login-submit-button" */}
          <button
            type="button"
            data-testid="login-submit-button"
            // O botão para entrar só deve ser habilitado caso o nome digitado tenha 3 caracteres ou mais (crie um estado para controlar isso).
            disabled={ isSaveButtonDisabled }
            // Ao clicar no botão Entrar (...) => seguir para onSaveButtonClick
            onClick={ this.onSaveButtonClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
