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

  async componentDidMount() {
    const user = await getUser();
    const username = await user.name;
    this.changeUsername(username);
  }

  changeUsername(username) {
    this.setState({ username });
  }

  render() {
    const { username } = this.state;

    if (!username) return <Loading />;

    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ username }</p>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}
