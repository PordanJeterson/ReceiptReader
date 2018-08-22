import * as React from "react";
import { ChangeEvent, Component, FormEvent, ReactElement, MouseEvent } from "react";
import Close from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { WithStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { getStateByZip, validateForm, validateField } from "../../services";
import newLeadStyle from "./NewLeadStyle";
import { NewLeadErrorInterface, NewLeadInterface } from "../../interfaces";
import { LeadType } from "../../enums/LeadType";
import { usStates, prettyNames } from "../../constants";
import { submitLead } from "../../services/submitLead";

interface NewLeadProps extends WithStyles<typeof newLeadStyle> {
}

interface initialStateInterface {
    error: NewLeadErrorInterface;
    newLead: NewLeadInterface;
    snackBar: {
        open: boolean,
        message: ReactElement<any>
    }
}

const initialLead: NewLeadInterface = {
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
    newLead: initialLead,
    snackBar: {
        open: false,
        message: <span>No Content</span>,
    }
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
        this.changeStateFromZip(zipCode);
        this.handleChange('zipCode')(event);
    };

    private changeStateFromZip = async (zipCode: string) => {
        if (validateField.zipCode(zipCode)) {
            const state = await getStateByZip(zipCode);
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

    private handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formIsValid = this.formValidation();
        this.setAllDirty();
        if (formIsValid) {
            console.log("form is valid!");
            console.log(event.target);
            const lead = this.state.newLead;
            const response = await submitLead(lead);
            if (response.hasOwnProperty("error")) {
                this.displaySnackBarMessage(response.error);
            } else {
                this.setState(() => ({...initialState}));
                this.displaySnackBarMessage(response.message);
            }

        }
    };

    private displaySnackBarMessage = (message: string) => {


        this.setState(() => ({
            snackBar: {
                open: true,
                message:
                    <span id="message-id">
                        {message}
                    </span>
            }
        }));
    };

    private handleClose = (event: MouseEvent<HTMLElement>) => {
        this.setState(() => ({
            snackBar: {
                open: false,
                message: ''
            }
        }));
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
                            type="text"
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
                            type="text"
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
                            type="text"
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
                            type="text"
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
                    <Button className={classes.submitButton} color='primary' type="submit">Submit Form</Button>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    autoHideDuration={6000}
                    open={this.state.snackBar.open}
                    message={this.state.snackBar.message}
                    onClose={this.handleClose}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <Close/>
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

export default withStyles(newLeadStyle)(NewLead);