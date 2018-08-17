import * as React from "react";
import { Component, MouseEvent } from "react";
import { Button, withStyles, WithStyles } from "@material-ui/core";

import { getStateByZip } from "../../services";
import newLeadStyle from "./NewLeadStyle";
import { NewLeadInterface } from "../../interfaces/NewLead";
import { LeadType } from "../../enums/LeadType";

interface HomeProps extends WithStyles<typeof newLeadStyle> {
}

const initialState: NewLeadInterface = {
    zipCode: "",
    firstName: "",
    lastName: "",
    leadType: LeadType.none,
    state: ""
};
type State = Readonly<typeof initialState>;

class NewLead extends Component<HomeProps, {}> {

    state: State = initialState;

    private testApi(event: MouseEvent<HTMLElement>) {
        const zipCode = '66223';
        getStateByZip(zipCode).then((response) => {
            console.log(response);
        });
    }

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <form>

                    <Button onClick={this.testApi}>Test api</Button>
                </form>
            </div>
        );
    }
}

export default withStyles(newLeadStyle)(NewLead);