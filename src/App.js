import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      // 1. Crie as rotas necessárias para a aplicação - Você deve utilizar o BrowserRouter pra criar as rotas da sua aplicação e cada rota deverá renderizar um componente específico.
      <BrowserRouter>
        {/* O <Switch> procura de cima para baixo pelo primeiro entre seus elementos filhos <Route> cujo caminho (path) corresponda a uma substring da URL atual e ignora todos os outros. Isso significa que você deve colocar <Route>s com caminhos mais específicos antes de outros mais genéricos * Fonte: https://reactrouter.com/web/guides/primary-components */}
        {/* Por isso o "/" foi para o final, antes apenas de "*", que por ser um curinga é ainda mais genérico, e "/profile/edit" está antes de "/profile" */}
        <Switch>
          {/* a rota (path) /search deve renderizar um componente chamado Search */}
          <Route path="/search" component={ Search } />
          {/* a rota (path) /album/:id deve renderizar um componente chamado Album */}
          <Route path="/album/:id" component={ Album } />
          {/* a rota (path) /favorites deve renderizar um componente chamado Favorites */}
          <Route path="/favorites" component={ Favorites } />
          {/* a rota (path) /profile/edit deve renderizar um componente chamado ProfileEdit */}
          <Route path="/profile/edit" component={ ProfileEdit } />
          {/* a rota (path) /profile deve renderizar um componente chamado Profile */}
          <Route path="/profile" component={ Profile } />
          {/* a rota (path) / deve renderizar um componente chamado Login */}
          <Route exact path="/" component={ Login } />
          {/* para qualquer outra rota não mapeada, deve ser renderizado um componente chamado NotFound */}
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
