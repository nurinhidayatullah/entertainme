import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'

import {client} from './config'

import Landing from './views/Landing'
import Home from './views/Home'
import Add from './views/Add'
import Edit from './views/Edit'
import WatchList from './views/WatchList'

import './style.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route path='/' component={Landing} exact/>
            <Route path='/home/:category' component={Home} />
            <Route path='/add' component={Add} />
            <Route path='/edit/:id/:type' component={Edit} />
            <Route path='/watch-list' component={WatchList} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
