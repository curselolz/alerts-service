'use strict';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
// eslint-disable-next-line
import {routerReducer, syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Router, Route, browserHistory} from 'react-router';
import AlertsPage from './components/alerts-page';
import AlertDetails from './components/alerts-details';
import AlertEscalation from './components/alerts-escalation';
import {cvoReducers} from 'cvo-state';
import {CvoApplication} from 'components';

import alerts from './reducers/alerts';
import escalation from './reducers/escalation';
const routingMiddleware = routerMiddleware(browserHistory);
const reducer = combineReducers({ ...cvoReducers, routing: routerReducer, alerts, escalation});

const IS_DEV = process.env.NODE_ENV !== 'production';
let middleware;

if (IS_DEV) {
  middleware = applyMiddleware(
    thunk,
    logger,
    routingMiddleware
  )
} else {
  middleware = applyMiddleware(
    routingMiddleware,
    thunk
  )
}

export const store = createStore(reducer, middleware);

const history = syncHistoryWithStore(browserHistory, store);
const moduleId = 'cvo.alerts';

render((
  <CvoApplication store={store} module={moduleId}>
    <Router history={history}>
      <Route path='/alerts/' component={AlertsPage} />
      <Route path='/alerts/:id' component={AlertDetails} />
      <Route path='/alerts-escalation' component={AlertEscalation} />
    </Router>
  </CvoApplication>
), document.getElementById('app'));
