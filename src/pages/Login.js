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

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableSaveButton();
  }

  async onSaveButtonClick() {
    const { login } = this.state;
    this.setState((prevState) => ({ loading: prevState.loading + 1 }));
    await createUser({ name: login });
    this.setState((prevState) => ({ loading: prevState.loading + 1 }));
  }

  enableSaveButton() {
    this.setState(({ login }) => {
      const minInputLength = 3;
      return ({ isSaveButtonDisabled: login.length < minInputLength });
    });
  }

  render() {
    const { login, isSaveButtonDisabled, loading } = this.state;
    if (loading === 2) {
      return (<Redirect to="/search" />);
    }

    if (loading === 1) {
      return (<Loading />);
    }

    return (
      <div data-testid="page-login">
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
      </div>
    );
  }
}
