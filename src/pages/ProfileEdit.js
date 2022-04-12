// 1. Crie as rotas necessárias para a aplicação - Crie cada componente dentro da pasta src/pages
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      isSaveButtonDisabled: true,
      loading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.enableSaveButton = this.enableSaveButton.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
  }

  // Se você precisar carregar (recuperar) dados de um endpoint remoto (ou de um componente que simule isso ;)) (imediatamente após um componente ser montado), {componentDidMount()} é um bom lugar para instanciar (fazer) sua requisição * Fonte: https://pt-br.reactjs.org/docs/react-component.html#componentdidmount
  async componentDidMount() {
    // 13. - Recupere as informações da pessoa logada
    await this.getUserInfo();
    this.enableSaveButton();
  }

  // Event handler genérico sem checkbox * Fonte: https://pt-br.reactjs.org/docs/forms.html - seção Manipulando Múltiplos Inputs
  onInputChange({ target }) {
    const { name, value } = target;
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
    this.enableSaveButton();
  }

  // 14. - Função ativada ao clicar no botão Salvar
  async onSaveButtonClick() {
    const { user } = this.state;
    const { history } = this.props;
    // Enquanto aguarda a resposta da API, exiba a mensagem Carregando.... (mais explicações no render)
    this.setState({ loading: true });
    // (...) utilize a função updateUser da userAPI para atualizar as informações da pessoa usuária.
    await updateUser(user); // A função updateUser espera receber um objeto com as informações da pessoa
    // Ao finalizar o processo de edição, redirecione a pessoa logada para a página de exibição de perfil (rota /profile)
    history.push('/profile');
  }

  // Função que salva o user no estado, pois não é possível fazer isso corretamente direto do componentDidMount
  async getUserInfo() {
    // Enquanto aguarda a resposta da API, exiba a mensagem Carregando...
    this.setState({ loading: true });
    // Utilize a função getUser da userAPI para recuperar as informações da pessoa logada
    const user = await getUser(); // A função getUser retorna o objeto user
    // Salve esse objeto no estado para poder utilizá-lo
    this.setState({ user, loading: false });
  }

  // Função que controla se o botão de Salvar está habilitado
  enableSaveButton() {
    this.setState(({ user }) => { // Recupera o valor das chaves de user do estado, controladas pela função onInputChange
      const emailRegex = /[\w.-]+@[\w]+(\.[\w]+)+/;
      // Para poder habilitar o botão de enviar, todos os campos precisam estar preenchidos (não podem estar vazios)
      const isSaveButtonDisabled = Object.values(user).some((value) => value === '')
      // O campo de email, além de não estar vazio também precisa verificar que o email tem um formato válido, ou seja, deve seguir o padrão test@test.com
      || !user.email.match(emailRegex);
      return ({ isSaveButtonDisabled });
    });
  }

  render() {
    const {
      user: { name, email, image, description }, // Propriedades do objeto recebido pela API
      isSaveButtonDisabled, // chave que controla se o botão está (des)habilitado, controlada pela função enableSaveButton
      loading, // chave que controla a lógica de aparição do componente Loading
    } = this.state;

    return (
      // 1. Crie as rotas necessárias para a aplicação - a rota /profile/edit deve renderizar um componente chamado ProfileEdit. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-profile-edit"
      <div data-testid="page-profile-edit">
        {/* 3. Crie um componente de cabeçalho - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
        { (() => (loading ? <Loading /> : (
        // Após receber as informações da pessoa logada, renderize um formulário já preenchido com os seguintes campos
          <main>
            <img src={ image } data-testid="profile-image" alt="Imagem do perfil" />
            {/* Após receber as informações da pessoa logada, renderize um formulário já preenchido com os seguintes campos */}
            <input
              name="image"
              value={ image }
              type="text"
              data-testid="edit-input-image"
              onChange={ this.onInputChange }
            />
            {/* Um campo para alterar o nome da pessoa usuária. Este campo precisa ter o atributo data-testid="edit-input-name" */}
            <input
              name="name"
              value={ name }
              type="text"
              data-testid="edit-input-name"
              onChange={ this.onInputChange }
            />
            {/* Um campo para alterar o email da pessoa usuária. Este campo precisa ter o atributo data-testid="edit-input-email" */}
            <input
              name="email"
              value={ email }
              type="email"
              data-testid="edit-input-email"
              onChange={ this.onInputChange }
            />
            {/* Um campo para alterar a descrição da pessoa usuária. Este campo precisa ter o atributo data-testid="edit-input-description" */}
            <input
              name="description"
              value={ description }
              type="text"
              data-testid="edit-input-description"
              onChange={ this.onInputChange }
            />
            {/* Um botão para salvar as informações alteradas. Este botão precisa ter o atributo data-testid="edit-button-save" */}
            <button
              type="button"
              data-testid="edit-button-save"
              // O botão de salvar as informações só deve ser habilitado quando todos os campos estiverem válidos (crie um estado para controlar isso).
              disabled={ isSaveButtonDisabled }
              // Ao clicar no botão Entrar (...) => seguir para onSaveButtonClick
              onClick={ this.onSaveButtonClick }
            >
              Salvar
            </button>
          </main>
        )))() }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
