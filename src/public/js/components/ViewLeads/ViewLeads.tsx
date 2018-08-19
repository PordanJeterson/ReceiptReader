import * as React from "react";
import { Component } from "react";
import { withStyles, WithStyles } from "@material-ui/core";

import ViewLeadsStyle from "./ViewLeadsStyle";

interface HomeProps extends WithStyles<typeof ViewLeadsStyle> {
}

class ViewLeads extends Component<HomeProps, {}> {

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div>
                    View Leads
                    test
                </div>
            </div>
        );
    }
}

export default withStyles(ViewLeadsStyle)(ViewLeads);