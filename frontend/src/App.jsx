import React from 'react';
import { LoginPage } from './routes/admin/Login.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <>
      {/* This is the main browser router. 
      Whenever you want to add a new page/route add it hear with a unique path */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/register">hey</Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
