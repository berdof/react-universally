/* @flow */

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from '../components/App';
import { IS_HOT_DEVELOPMENT } from '../config';

if (IS_HOT_DEVELOPMENT) {
  // HMR does not work 100% if you are using the dynamic component resolution
  // properties (i.e. getComponent or getComponents). Specifically, HMR will
  // work initially but if you change your route (i.e. browse to another part
  // of your app) then the HMR will stop working.
  // As a workaround for this scenario; for any of your components that are
  // resolved dynamically please require them below. If you don't want to
  // maintain this list then you could remove it and instead do a manual browser
  // refresh after changing the route.
  require('../components/Home'); // eslint-disable-line global-require
  require('../components/About'); // eslint-disable-line global-require
}

function handleError(err) {
  // TODO: Error handling, do we return an Error component here?
  console.log('==> Error occurred loading dynamic route'); // eslint-disable-line no-console
  console.log(err); // eslint-disable-line no-console
}

function resolveIndexComponent(nextState, cb) {
  System.import('../components/Home')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

function resolveAboutComponent(nextState, cb) {
  System.import('../components/About')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

/**
 * Our routes.
 *
 * NOTE: We load our routes asynhronously using the `getComponent` API of
 * react-router, doing so combined with the `System.import` support by
 * webpack 2 allows us to get code splitting based on our routes.
 * @see https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
 * @see https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6
 */
const routes = (
  <Route path="/" component={App}>
    <IndexRoute getComponent={resolveIndexComponent} />
    <Route path="about" getComponent={resolveAboutComponent} />
  </Route>
);

export default routes;
