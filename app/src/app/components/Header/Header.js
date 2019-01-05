import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SebIcon from 'resources/seb-icon';

import './header.scss';

const Header = () => (
    <AppBar position="static" color="primary">
        <Toolbar>
            <SebIcon className="sebIcon"/>
        </Toolbar>
    </AppBar>
);

export default Header;
