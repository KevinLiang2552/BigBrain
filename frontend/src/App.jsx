import React, { useEffect, useState } from 'react';
import { SplashPage } from './routes/Splash.jsx';
import { LoginPage } from './routes/admin/Login.jsx';
import { RegisterPage } from './routes/admin/Register.jsx';
import { PlayPage } from './routes/user/Play.jsx';
import { LobbyPage } from './routes/user/Lobby.jsx';
import { DashboardPage } from './routes/admin/Dashboard.jsx';
import { EditQuizPage } from './routes/admin/EditQuiz.jsx';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components/Header';

import {
  getAuthToken,
  setAuthToken,
  getPlayerToken,
  setPlayerToken,
} from './helpers/user.js';

function App() {
  // current admin auth token NOTE: named authenToken to not conflict with user.js
  const [authenToken, setAuthenToken] = useState(getAuthToken());

  /// If auth token updates update local storage
  useEffect(() => setAuthToken(authenToken), [authenToken]);

  // Required function wrapper around setAuthToken as it can not be passdown to
  const childSetAuthToken = (token) => {
    setAuthenToken(token);
  };

  // Same as above, but for the player
  const [playToken, setPlayToken] = useState(getPlayerToken());

  useEffect(() => setPlayerToken(playToken), [playToken]);

  const childSetPlayerToken = (token) => {
    setPlayToken(token);
  };

  return (
    <>
      {/* This is the main browser router. 
      Whenever you want to add a new page/route add it hear with a unique path */}
      <BrowserRouter>
        <Header authToken={authenToken} setAuthToken={childSetAuthToken} />
        <Switch>
          <Route exact path="/">
            {authenToken === '' ? (
              <SplashPage></SplashPage>
            ) : (
              <Redirect to="/dashboard"></Redirect>
            )}
          </Route>
          <Route path="/login">
            {authenToken === '' ? (
              <LoginPage setAuthToken={childSetAuthToken}></LoginPage>
            ) : (
              <Redirect to="/dashboard"></Redirect>
            )}
          </Route>
          <Route path="/register">
            {authenToken === '' ? (
              <RegisterPage setAuthToken={childSetAuthToken}></RegisterPage>
            ) : (
              <Redirect to="/dashboard"></Redirect>
            )}
          </Route>
          <Route path="/dashboard/edit/:id/question">
            <EditQuizPage />
          </Route>
          <Route path="/dashboard/edit/:id">
            <EditQuizPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage></DashboardPage>
          </Route>
          <Route path="/play/:id/lobby">
            <LobbyPage />
          </Route>
          <Route path="/play/:id">
            <PlayPage setPlayerToken={childSetPlayerToken}></PlayPage>
          </Route>
          <Route path="/play">
            <PlayPage setPlayerToken={childSetPlayerToken}></PlayPage>
          </Route>
          <Route>
            <SplashPage></SplashPage>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
