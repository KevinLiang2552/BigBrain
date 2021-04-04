import React, { useEffect, useState } from 'react';
import { SplashPage } from './routes/Splash.jsx';
import { LoginPage } from './routes/admin/Login.jsx';
import { RegisterPage } from './routes/admin/Register.jsx';
import { DashboardPage } from './routes/admin/Dashboard.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header } from './components/Header';

import { getAuthToken, setAuthToken } from './helpers/user.js';

function App() {
  // current admin auth token NOTE: named authenToken to not conflict with user.js
  const [authenToken, setAuthenToken] = useState(getAuthToken());

  /// If auth token updates update local storage
  useEffect(() => setAuthToken(authenToken), [authenToken]);

  // Require function wrapper around setAuthToken as it can not be passdown to
  const childSetAuthToken = (token) => {
    console.log({ token });
    console.log({ authenToken });
    setAuthenToken(token);
  };

  return (
    <>
      {/* This is the main browser router. 
      Whenever you want to add a new page/route add it hear with a unique path */}
      <BrowserRouter>
        <Header authToken={authenToken} />
        <Switch>
          <Route exact path="/">
            <SplashPage></SplashPage>
          </Route>
          <Route path="/login">
            <LoginPage setAuthToken={childSetAuthToken}></LoginPage>
          </Route>
          <Route path="/register">
            <RegisterPage setAuthToken={childSetAuthToken}></RegisterPage>
          </Route>
          <Route path="/dashboard">
            <DashboardPage></DashboardPage>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
