import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Config from './Pages/Config';
import Game from './Pages/Game';
import Login from './Pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
      </Switch>
    </div>
  );
}
