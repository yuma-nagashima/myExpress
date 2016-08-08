import React, { Component } from 'react';
import { render } from 'react-dom';
import { IndexRoute, Link, Router, Route } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';

import PageA from './components/PageA'
import PageB from './components/PageB'

class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">index</Link></li>
                    <li><Link to="/a">page A</Link></li>
                    <li><Link to="/b">page B</Link></li>
                </ul>
                <div>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

class Index extends Component {
    render() {
        return <div>Index</div>;
    }
}

render((
      <Router history={BrowserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="/a" component={PageA} />
            <Route path="/b" component={PageB} />
        </Route>
      </Router>
  ), document.getElementById('content')
);