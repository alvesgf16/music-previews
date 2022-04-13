import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

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

  async componentDidMount() {
    await this.getUserInfo();
  }

  onEditButtonClick() {
    const { history } = this.props;
    history.push('/profile/edit');
  }

  async getUserInfo() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const {
      user: { name, email, image, description },
      loading,
    } = this.state;

    return (
      <div>
        <Header />
        { (() => (loading ? <Loading /> : (
          <main>
            <img src={ image } alt="Imagem do perfil" />
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
