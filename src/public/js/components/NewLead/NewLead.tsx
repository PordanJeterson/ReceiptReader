import * as React from "react";
import { Component } from "react";
import { withStyles, WithStyles } from "@material-ui/core";

import newLeadStyle from "./NewLeadStyle";

interface HomeProps extends WithStyles<typeof newLeadStyle> {
}

class NewLead extends Component<HomeProps, {}> {

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div>
                    New Lead Form
                </div>
            </div>
        );
    }
}

export default withStyles(newLeadStyle)(NewLead);