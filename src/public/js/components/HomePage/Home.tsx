import * as React from "react";
import { Component } from "react";
import { withStyles, WithStyles } from "@material-ui/core";

import homeStyle from "./HomeStyle";
import { NavBar } from '../NavBar';

interface HomeProps extends WithStyles<typeof homeStyle> {
}

class Home extends Component<HomeProps, {}> {

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div>
                <NavBar/>
                <div className={classes.appBar}>
                    This is where the form goes
                </div>
            </div>
        );
    }
}

export default withStyles(homeStyle)(Home);