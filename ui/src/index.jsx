import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter, Switch, Route } from 'react-router-dom';

import './style.css'

const Navbar = React.lazy(() => import('./components/Navbar'));
const Footer = React.lazy(() => import('./components/Footer'));

const Filter = React.lazy(() => import('./page/Filter'));
const Detail = React.lazy(() => import('./page/Detail'));

function Index() {
  return (
    <React.Suspense fallback={<h1>载入中...</h1>}>
      <HashRouter>
        <section>
          <header>
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                <Filter />
              </Route>
              <Route exact path="/新增">
                <Detail />
              </Route>
              <Route path="/:id">
                <Detail />
              </Route>
            </Switch>
          </main>
          <Footer />
        </section>
      </HashRouter>
    </React.Suspense>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root'),
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
