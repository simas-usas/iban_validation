import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Route } from 'react-router-dom';

import Home from 'containers/Home/Home';

import './app.scss';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#60cd18',
            contrastText: '#fff',
        },
    },
    typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true,
    },
});

export default () => (
    <MuiThemeProvider theme={theme}>
        <div className="app">
            <Route exact path="/" component={Home} />
        </div>
    </MuiThemeProvider>
);
