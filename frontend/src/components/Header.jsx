import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { LoginPage } from '../routes/admin/Login.jsx';

export const Header = () => {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
        <hr />

        <Switch>
          <Route exact path='/'>
            <></>
          </Route>
          <Route path='/login'>
            <LoginPage></LoginPage>
          </Route>
          <Route path='/register'>
            <a>Register</a>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};
