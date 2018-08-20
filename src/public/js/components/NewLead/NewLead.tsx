import * as React from "react";
import { ChangeEvent, Component, FormEvent } from "react";
import { MenuItem, TextField, withStyles, WithStyles } from "@material-ui/core";

import { getStateByZip, validateForm, validateField } from "../../services";
import newLeadStyle from "./NewLeadStyle";
import { PrettyNamesInterface, NewLeadErrorInterface, NewLeadInterface } from "../../interfaces";
import { LeadType } from "../../enums/LeadType";
import { usStates } from "../../constants";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

interface NewLeadProps extends WithStyles<typeof newLeadStyle> {
}

interface initialStateInterface {
    error: NewLeadErrorInterface;
    newLead: NewLeadInterface;
}

const formData = new FormData();
const initialLead: NewLeadInterface = {
    ...formData,
    firstName: "",
    lastName: "",
    leadType: LeadType.none,
    state: "",
    zipCode: ""
};

const initialState: initialStateInterface = {
    error: {
        leadType: {
            dirty: false,
            isInvalid: false
        },
        firstName: {
            dirty: false,
            isInvalid: false
        },

        lastName: {
            dirty: false,
            isInvalid: false
        },

        zipCode: {
            dirty: false,
            isInvalid: false
        },
        state: {
            dirty: false,
            isInvalid: false
        },
        dirty: {
            dirty: false,
            isInvalid: false
        }
    },
    newLead: initialLead
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

        this.formValidation(name, value);

        this.setState((prevState) => ({
            newLead: {
                // @ts-ignore
                ...prevState.newLead,
                [name]: value
            }
        }));

    };

    private formValidation = (name?: string, value?: string) => {
        const lead = this.state.newLead;
        if (name && value) {
            lead[name] = value;
        }
        const formValidation = validateForm(lead);
        this.handleErrors(formValidation);
        return !formValidation.dirty.isInvalid;
    };

    private setDirty = (name: string) => {
        this.setState((prevState) => ({
            error: {
                // @ts-ignore
                ...prevState.error,
                [name]: {
                    // @ts-ignore
                    ...prevState.error[name],
                    dirty: true
                }
            }
        }));
    };

    private handleBlur = (name: string) => () => {
        this.setDirty(name);
        this.formValidation();
    };

    private handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const zipCode = event.target.value;
        if (validateField.zipCode(zipCode)) {
            getStateByZip(zipCode).then(
                (state) => {
                    // in this case it's a value add and not essential, so we don't throw an error when server
                    // has an error and is not able to get us the state
                    if (state.hasOwnProperty("state")) {
                        this.setState((prevState) => ({
                            newLead: {
                                // @ts-ignore
                                ...prevState.newLead,
                                ...state
                            }
                        }));
                    }
                }
            );
        }
        this.handleChange('zipCode')(event);
    };

    private getAllFormNames = () => {
        return Object.keys(this.state.newLead);
    };

    private setAllDirty = () => {
        const formNames = this.getAllFormNames();
        formNames.forEach((name) => {
            this.setDirty(name);
        });
    };

    private handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formIsValid = this.formValidation();
        this.setAllDirty();

        if (formIsValid) {

        }
    };

    private handleErrors = (formValidation: NewLeadErrorInterface) => {
        this.setState((prevState) => {
            // must merge state from here and from function
            Object.keys(formValidation).forEach((value) => {
                formValidation[value] = {
                    // @ts-ignore
                    dirty: prevState.error[value].dirty,
                    isInvalid: formValidation[value].isInvalid
                };
            });
            return {
                error: formValidation
            };
        });
    };

    public render(): JSX.Element {
        const {classes} = this.props;
        const {
            error,
            newLead:
                {
                    zipCode,
                    firstName,
                    lastName,
                    leadType, state
                }
        } = this.state;

        return (
            <div className={classes.root}>
                <form onSubmit={this.handleSubmit}>
                    <div className={classes.formInput}>
                        <TextField
                            onBlur={this.handleBlur('leadType')}
                            fullWidth={true}
                            id="leadType"
                            name="leadType"
                            label={prettyNames.leadType}
                            value={leadType}
                            error={error.leadType.dirty && error.leadType.isInvalid}
                            onChange={this.handleChange("leadType")}
                            select

                        >
                            {Object.keys(LeadType)
                                .filter((type) => (type !== 'none'))
                                .map((type) => (
                                        <MenuItem
                                            key={type}
                                            value={type}>
                                            {type}
                                        </MenuItem>
                                    )
                                )}
                        </TextField>
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            onBlur={this.handleBlur('firstName')}
                            fullWidth={true}
                            id="firstName"
                            name="firstName"
                            label={prettyNames.firstName}
                            value={firstName}
                            error={error.firstName.dirty && error.firstName.isInvalid}
                            onChange={this.handleChange("firstName")}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            onBlur={this.handleBlur("lastName")}
                            fullWidth={true}
                            id="lastName"
                            name="lastName"
                            label={prettyNames.lastName}
                            value={lastName}
                            error={error.lastName.dirty && error.lastName.isInvalid}
                            onChange={this.handleChange("lastName")}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            onBlur={this.handleBlur("zipCode")}
                            fullWidth={true}
                            id="zipCode"
                            name="zipCode"
                            label={prettyNames.zipCode}
                            value={zipCode}
                            error={error.zipCode.dirty && error.zipCode.isInvalid}
                            onChange={this.handleZipCodeChange}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            onBlur={this.handleBlur("state")}
                            fullWidth={true}
                            id="state"
                            name="state"
                            label={prettyNames.state}
                            value={state}
                            error={error.state.dirty && error.state.isInvalid}
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
                    <button type="submit">Submit Form</button>
                </form>
            </div>
        );
    }
}

export default withStyles(newLeadStyle)(NewLead);