import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from 'host/Navigation';
import localRoutes from "./routes";
import remoteRoutes from "host/routes";

const routes = [...localRoutes, ...remoteRoutes];

function App() {
  return (
    <HashRouter>
      <div className='App'>
        <Navigation />
        <React.Suspense fallback={<div className='App-section'>Loading...</div>}>
          <Switch>
            {
              routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                />
              ))
            }
          </Switch>
        </React.Suspense>
      </div>
    </HashRouter>
  );
}

export default App;
