'use strict';
import { render } from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
// eslint-disable-next-line
import {routerReducer, syncHistoryWithStore} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AlertsPage from './components/alerts-page';
import AlertDetails from './components/alerts-details';
import AlertEscalation from './components/alerts-escalation';
import {cvoReducers} from 'cvo-state';
import {CvoApplication} from 'components';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'reactRouterHistory';
import { connectRouter, routerMiddleware } from 'reactConnectedRouter'

import alerts from './reducers/alerts';
import escalation from './reducers/escalation';
import createRootReducer from './reducers'
// const routingMiddleware = routerMiddleware(browserHistory);

import TrackablesReducer from './reducers';


// const reducer = combineReducers({ ...cvoReducers, routing: routerReducer, trackables: TrackablesReducer, alerts, escalation});
const reducer = (history) => combineReducers({
  ...cvoReducers,
  router: connectRouter(history),
  routing: routerReducer,
  trackables: TrackablesReducer,
  alerts,
  escalation
});

const IS_DEV = process.env.NODE_ENV !== 'production';
let middleware;

if (IS_DEV) {
  middleware = applyMiddleware(
    thunk,
    logger,
    // routingMiddleware
  )
} else {
  middleware = applyMiddleware(
    // routingMiddleware,
    thunk
  )
}

// export const store = createStore(reducer, middleware);
export const store = createStore(
    connectRouter(history)(rootReducer),
    createRootReducer(history),
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
)
const history = createBrowserHistory();
const moduleId = 'cvo.alerts';

createRootReducer(history),
render((
  <CvoApplication store={store} module={moduleId}>
    <Router >
      <Route path='/alerts' component={AlertsPage} />
      <Route path='/alerts/:id' component={AlertDetails} />
      <Route path='/alerts-escalation' component={AlertEscalation} />
    </Router>
  </CvoApplication>
), document.getElementById('app'));
