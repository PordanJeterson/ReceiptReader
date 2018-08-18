import * as React from "react";
import { ChangeEvent, Component, MouseEvent } from "react";
import { Button, TextField, withStyles, WithStyles } from "@material-ui/core";

import { getStateByZip } from "../../services";
import newLeadStyle from "./NewLeadStyle";
import { NewLeadInterface } from "../../interfaces/NewLead";
import { LeadType } from "../../enums/LeadType";
import { PrettyNamesInterface } from "../../interfaces/PrettyNamesInterface";

interface HomeProps extends WithStyles<typeof newLeadStyle> {
}

const initialState: NewLeadInterface = {
    zipCode: "",
    firstName: "",
    lastName: "",
    leadType: LeadType.none,
    state: ""
};

const prettyNames: PrettyNamesInterface = {
    zipCode: "Zip Code",
    firstName: "First Name",
    lastName: "Last Name",
    leadType: "Lead Type",
    state: "State"
};

type State = Readonly<typeof initialState>;

class NewLead extends Component<HomeProps, {}> {

    readonly state: State = initialState;

    private getUsState = (event: MouseEvent<HTMLElement>) => {
        const zipCode = '66223';
        getStateByZip(zipCode).then((response) => {
            console.log(response);
        });
    };

    private handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.setState(() => ({[name]: value}));
    };

    public render(): JSX.Element {
        const {classes} = this.props;
        const formElements = Object.keys(this.state).map((key) => {
            return (
                <div key={key}>
                    <TextField
                        id={key}
                        name={key}
                        label={prettyNames[key]}
                        value={this.state[key]}
                        onChange={this.handleChange(key)}
                    />
                </div>
            );
        });

        return (
            <div className={classes.root}>
                <form>
                    {formElements}
                    <div>what the hay</div>
                    <Button onClick={this.getUsState}>Test api</Button>
                </form>
            </div>
        );
    }
}

export default withStyles(newLeadStyle)(NewLead);