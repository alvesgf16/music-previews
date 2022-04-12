import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      isSaveButtonDisabled: true,
      loading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.enableSaveButton = this.enableSaveButton.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableSaveButton();
  }

  async onSaveButtonClick() {
    const { login } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: login });
    history.push('/');
  }

  enableSaveButton() {
    this.setState(({ login }) => {
      const minInputLength = 3;
      return ({ isSaveButtonDisabled: login.length < minInputLength });
    });
  }

  render() {
    const {
      login,
      isSaveButtonDisabled,
      loading,
    } = this.state;

    return (loading ? <Loading /> : (
      <div data-testid="page-login">
        <form>
          <input
            name="login"
            value={ login }
            type="text"
            data-testid="login-name-input"
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isSaveButtonDisabled }
            onClick={ this.onSaveButtonClick }
          >
            Entrar
          </button>
        </form>
      </div>
    ));
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
