import '@babel/polyfill';

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import App from 'containers/App/App';

render(
    (
        <Router history={createBrowserHistory()}>
            <React.Fragment>
                <CssBaseline />
                <App />
            </React.Fragment>
        </Router>
    ), document.getElementById('root'),
);
