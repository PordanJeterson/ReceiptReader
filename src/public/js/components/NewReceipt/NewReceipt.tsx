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

import { validateForm } from "../../services";
import newReceiptStyle from "./NewReceiptStyle";
import { submitReceipt } from "../../services/submitReceipt";

interface NewReceiptProps extends WithStyles<typeof newReceiptStyle> {
}

interface Receipt {
    [index: string]: any
}

interface initialStateInterface {
    receipt: Receipt,
    snackBar: {
        message: ReactElement<any>,
        open: boolean
    }
}

const initialState: initialStateInterface = {
    receipt: {},
    snackBar: {
        message: <div>message</div>,
        open: false
    }
};


type State = Readonly<typeof initialState>;

class NewReceipt extends Component<NewReceiptProps, {}> {

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
        const receipt = this.state.receipt;
        if (name && value) {
            receipt[name] = value;
        }
        const formValidation = validateForm(receipt);
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


    private getAllFormNames = () => {
        return Object.keys(this.state.receipt);
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
            const receipt = this.state.receipt;
            const response = await submitReceipt(receipt);
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

    private handleErrors = (formValidation: any) => {
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

        return (
            <div className={classes.root}>
                <form onSubmit={this.handleSubmit}>
                    <div>Put the receipt entry here</div>
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

export default withStyles(newReceiptStyle)(NewReceipt);