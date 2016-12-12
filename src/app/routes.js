import React from 'react';
import { Route, Redirect } from 'react-router';

import Board from './containers/Board/Board';

/**
 * Define routes
 */
const routes = (
    <Route path="/" component={Board}>
        <Redirect from="*" to="/" />
    </Route>
);

export default routes;
