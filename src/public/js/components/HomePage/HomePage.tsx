import * as React from "react";
import { Component } from "react";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { WithStyles } from "@material-ui/core/styles";

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