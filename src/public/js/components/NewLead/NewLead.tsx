import * as React from "react";
import { ChangeEvent, Component, MouseEvent } from "react";
import { MenuItem, TextField, withStyles, WithStyles } from "@material-ui/core";

import { getStateByZip } from "../../services";
import newLeadStyle from "./NewLeadStyle";
import { NewLeadInterface } from "../../interfaces/NewLead";
import { LeadType } from "../../enums/LeadType";
import { PrettyNamesInterface } from "../../interfaces/PrettyNamesInterface";
import { usStates } from "../../constants";

interface NewLeadProps extends WithStyles<typeof newLeadStyle> {
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

class NewLead extends Component<NewLeadProps, {}> {

    readonly state: State = initialState;

    private handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.setState(() => ({[name]: value}));
    };

    private handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        // todo get us state then set us state based on that
        const zipCode = event.target.value;
        if (zipCode.length === 5) {
            getStateByZip(zipCode).then(
                (state) => {
                    this.setState(() => ({...state}));
                }
            );
        }

        this.handleChange('zipCode')(event);
    };

    private handleSubmit = () => {
    };

    public render(): JSX.Element {
        const {classes} = this.props;
        const {zipCode, firstName, lastName, leadType, state} = this.state;

        return (
            <div className={classes.root}>
                <form onSubmit={this.handleSubmit}>
                    <div className={classes.formInput}>
                        <TextField
                            fullWidth={true}
                            id="firstName"
                            name="firstName"
                            label={prettyNames.firstName}
                            value={firstName}
                            onChange={this.handleChange("firstName")}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            fullWidth={true}
                            id="lastName"
                            name="lastName"
                            label={prettyNames.lastName}
                            value={lastName}
                            onChange={this.handleChange("lastName")}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            fullWidth={true}
                            id="zipCode"
                            name="zipCode"
                            label={prettyNames.zipCode}
                            value={zipCode}
                            onChange={this.handleZipCodeChange}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            fullWidth={true}
                            id="state"
                            name="state"
                            label={prettyNames.state}
                            value={state}
                            onChange={this.handleChange("state")}
                            select
                        >
                            {usStates.map((state) => (
                                <MenuItem
                                    key={state.value}
                                    value={state.value}>
                                    {state.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            fullWidth={true}
                            id="leadType"
                            name="leadType"
                            label={prettyNames.leadType}
                            value={leadType}
                            onChange={this.handleChange("leadType")}
                        />
                    </div>
                    <button type="submit">Submit Form</button>
                </form>
            </div>
        );
    }
}

export default withStyles(newLeadStyle)(NewLead);