import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Home extends Component {
  async componentDidMount() {
    const { history } = this.props;

    const user = await getUser();
    if (user === {}) history.push('/login');
  }

  render() {
    return (
      <Header />
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
