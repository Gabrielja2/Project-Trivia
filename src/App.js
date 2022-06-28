import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ConfigPage from './Pages/ConfigPage';
import GamePage from './Pages/GamePage';
import Login from './Pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/gamepage" component={ GamePage } />
        <Route path="/configpage" component={ ConfigPage } />
      </Switch>
    </div>
  );
}
