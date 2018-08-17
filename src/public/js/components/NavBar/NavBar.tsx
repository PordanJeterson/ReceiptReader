import * as React from "react";
import { Component } from "react";
import { withStyles, WithStyles, AppBar } from "@material-ui/core";

import navBarStyle from "./NavBarStyle";

interface NavBarProps extends WithStyles<typeof navBarStyle> {
}

class NavBar extends Component<NavBarProps, {}> {

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <AppBar classes={{root: classes.appBar}}>
                Test
            </AppBar>
        );
    }
}

export default withStyles(navBarStyle)(NavBar);
