// 3. Crie um componente de cabeçalho - Crie um componente chamado Header, dentro da pasta src/components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };

    this.changeUsername = this.changeUsername.bind(this);
  }

  // Se você precisar carregar (recuperar) dados de um endpoint remoto (ou de um componente que simule isso ;)) (imediatamente após um componente ser montado), {componentDidMount()} é um bom lugar para instanciar (fazer) sua requisição * Fonte: https://pt-br.reactjs.org/docs/react-component.html#componentdidmount
  async componentDidMount() {
    // Utilize a função getUser da userAPI para recuperar o nome da pessoa logada (...)
    const user = await getUser(); // A função getUser retorna o objeto user
    const username = user.name; // Obtém a o valor da chave name guardada ao clicar no botão Entrar do Login
    this.changeUsername(username); // E salva esse valor no estado para poder utilizá-lo
  }

  // Função que salva o username no estado, pois não é possível fazer isso corretamente direto do componentDidMount
  changeUsername(username) {
    this.setState({ username });
  }

  render() {
    const { username } = this.state;

    // 3. Crie um componente de cabeçalho - Enquanto estiver aguardando a resposta da getUser, exiba apenas a mensagem de Carregando...
    // Estado inicial antes da requisição à API (username indefinido - string vazia): mostra o componente <Loading />
    return (!username ? <Loading /> : (

    // Estado final após a requisição à API (username com valor obtido): mostra o conteúdo normal
      // 3. Crie um componente de cabeçalho - Crie esse componente com a tag header envolvendo todo seu conteúdo e com o atributo data-testid="header-component"
      <header data-testid="header-component">
        {/* (...) Exiba { o nome da pessoa logada } na tela. Você pode usar qualquer tag HTML que faça sentido, desde que ela tenha o atributo data-testid="header-user-name" */}
        <p data-testid="header-user-name">{ username }</p>
        {/* 4. Crie os links de navegação no cabeçalho */}
        {/* Crie o link que redireciona para a página de pesquisa dentro do componente Header. Este link deve ter o atributo data-testid="link-to-search" */}
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        {/* Crie o link que redireciona para a página de músicas favoritas dentro do componente Header. Este link deve ter o atributo data-testid="link-to-favorites" */}
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        {/* Crie o link que redireciona para a página de exibição de perfil dentro do componente Header. Este link deve ter o atributo data-testid="link-to-profile" */}
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    ));
  }
}
