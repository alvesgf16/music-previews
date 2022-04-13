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
      <div>
        <Header />
        <main>
          <section className="steps">
            <section className="step genre">
              <h2>1. Escolha o gênero</h2>
              <section className="genre-cards"></section>
            </section>
            <section className="step playlist">
              <h2>2. Escolha a playlist</h2>
              <section className="playlist-cards"></section>
            </section>
            <section className="step track">
              <h2>3. Escolha a música</h2>
              <section className="track-cards"></section>
            </section>
          </section>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
