import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
          <></>
          </Route>
          <Route path="/login">
            <a>Login</a>
          </Route>
          <Route path="/register">
            <a>Register</a>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
