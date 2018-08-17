import * as React from "react";
import { Component, MouseEvent } from "react";
import { Button, withStyles, WithStyles } from "@material-ui/core";

import { getStateByZip } from "../../services";
import newLeadStyle from "./NewLeadStyle";

interface HomeProps extends WithStyles<typeof newLeadStyle> {
}

class NewLead extends Component<HomeProps, {}> {

    private testApi(event: MouseEvent<HTMLElement>) {
        console.log('time to test API');
        getStateByZip('66223').then((response) => {
            console.log(response);
        });
    }

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Button onClick={this.testApi}>Test api</Button>
            </div>
        );
    }
}

export default withStyles(newLeadStyle)(NewLead);