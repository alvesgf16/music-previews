import React, { Component } from 'react';
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
      </header>
    );
  }
}
