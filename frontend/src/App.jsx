import React from 'react';
import { SplashPage } from './routes/Splash.jsx';
import { LoginPage } from './routes/admin/Login.jsx';
import { RegisterPage } from './routes/admin/Register.jsx';
import { PlayPage } from './routes/user/Play.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header } from './components/Header';

function App() {
  return (
    <>
      {/* This is the main browser router. 
      Whenever you want to add a new page/route add it hear with a unique path */}
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <SplashPage></SplashPage>
          </Route>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/register">
            <RegisterPage></RegisterPage>
          </Route>
          <Route path="/play">
            <PlayPage></PlayPage>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
