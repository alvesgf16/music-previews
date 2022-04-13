import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logoImage from '../images/logo-image.png';
import defaultUserImage from '../images/default-user-image.png';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
    };

    this.getUsername = this.getUsername.bind(this);
  }

  async componentDidMount() {
    this.getUsername();
  }

  async getUsername() {
    const user = await getUser();
    const { name, image } = user;
    this.setState({ name, image });
  }

  render() {
    const { name, image } = this.state;

    return (!name ? <Loading /> : (
      <div>
        <header>
          <section className="logo-title">
            <img src={ logoImage } alt="Music Previews Logo" height="75px" />
            <h1>Music Previews</h1>
          </section>
          <section className="user-container">
            <img
              className="profile-image"
              src={ image || defaultUserImage }
              alt="User"
            />
            <p>{ name }</p>
          </section>
        </header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/search">Pesquisar</Link>
          <Link to="/favorites">Favoritos</Link>
          <Link to="/profile">Perfil</Link>
        </nav>
      </div>
    ));
  }
}
