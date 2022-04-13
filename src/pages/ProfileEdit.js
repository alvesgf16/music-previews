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

  async componentDidMount() {
    await this.getUserInfo();
    this.enableSaveButton();
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
    this.enableSaveButton();
  }

  async onSaveButtonClick() {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await updateUser(user);
    history.push('/profile');
  }

  async getUserInfo() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  enableSaveButton() {
    this.setState(({ user }) => {
      const emailRegex = /[\w.-]+@[\w]+(\.[\w]+)+/;
      const isSaveButtonDisabled = Object.values(user).some((value) => value === '')
      || !user.email.match(emailRegex);
      return ({ isSaveButtonDisabled });
    });
  }

  render() {
    const {
      user: { name, email, image, description },
      isSaveButtonDisabled,
      loading,
    } = this.state;

    return (
      <div>
        <Header />
        { (() => (loading ? <Loading /> : (
          <main>
            <img src={ image } alt="Imagem do perfil" />
            <input
              name="image"
              value={ image }
              type="text"
              onChange={ this.onInputChange }
            />
            <input
              name="name"
              value={ name }
              type="text"
              onChange={ this.onInputChange }
            />
            <input
              name="email"
              value={ email }
              type="email"
              onChange={ this.onInputChange }
            />
            <input
              name="description"
              value={ description }
              type="text"
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              disabled={ isSaveButtonDisabled }
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
