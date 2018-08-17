import * as React from "react";
import { Component } from "react";
import { Typography, withStyles, WithStyles } from "@material-ui/core";

import homeStyle from "./HomeStyle";

interface HomeProps extends WithStyles<typeof homeStyle> {
}

class HomePage extends Component<HomeProps, {}> {

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div>
                    <Typography>Home page</Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(homeStyle)(HomePage);