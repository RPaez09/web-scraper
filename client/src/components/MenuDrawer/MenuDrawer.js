import React from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const MenuDrawer = props => (
    <div>
        <Drawer
            docked={false}
            width={250}
            open={props.open}
            onRequestChange={props.handleClose}>
            <MenuItem onClick={props.handleClose}>Search</MenuItem>
        </Drawer>
    </div>
);

export default MenuDrawer;