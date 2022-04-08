// 1. - Crie cada componente dentro da pasta src/pages
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

// 13. - Crie a exibição do perfil dentro do componente Profile, que é renderizado na rota /profile
export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loading: false,
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
  }

  // Se você precisar carregar (recuperar) dados de um endpoint remoto (ou de um componente que simule isso ;)) (imediatamente após um componente ser montado), {componentDidMount()} é um bom lugar para instanciar (fazer) sua requisição * Fonte: https://pt-br.reactjs.org/docs/react-component.html#componentdidmount
  async componentDidMount() {
    // 13. - Recupere as informações da pessoa logada
    await this.getUserInfo();
  }

  // Crie um link que redirecione para a página de edição de perfil (rota /profile/edit). Este link deve ter o texto Editar perfil
  onEditButtonClick() {
    const { history } = this.props;
    history.push('/profile/edit');
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

  render() {
    const {
      user: { name, email, image, description }, // Propriedades do objeto recebido pela API
      loading, // chave que controla a lógica de aparição do componente Loading
    } = this.state;

    return (
      // 1. - a rota /profile deve renderizar um componente chamado Profile. Este componente deve ter uma div que envolva todo seu conteúdo e ter o atributo data-testid="page-profile"
      <div data-testid="page-profile">
        {/* 3. - Renderize o componente de cabeçalho nas páginas das rotas /search, /album/:id, /favorites, /profile e /profile/edit */}
        <Header />
        {/* 13. - Estado inicial antes da requisição à API (user com chaves vazias): mostra o componente Loading */}
        { (() => (loading ? <Loading /> : (
        // Após receber o retorno da getUser, exiba o nome, o email, a descrição e a imagem da pessoa logada.
          <main>
            {/* Para exibir a imagem, use a tag HTML img com o atributo data-testid="profile-image" */}
            <img src={ image } data-testid="profile-image" alt="Imagem do perfil" />
            <button
              type="button"
              onClick={ this.onEditButtonClick }
            >
              Editar perfil
            </button>
            <h4>Nome</h4>
            <p>{ name }</p>
            <h4>E-mail</h4>
            <p>{ email }</p>
            <h4>Descrição</h4>
            <p>{ description }</p>
          </main>
        )))() }
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
