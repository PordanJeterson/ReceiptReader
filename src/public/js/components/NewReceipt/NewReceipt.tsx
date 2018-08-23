import * as React from "react";
import { ChangeEvent, Component, FormEvent, ReactElement, MouseEvent } from "react";
import Close from "@material-ui/icons/Close";
import * as Tesseract from "tesseract.js";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import withStyles from "@material-ui/core/styles/withStyles";
import { WithStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { validateForm } from "../../services";
import newReceiptStyle from "./NewReceiptStyle";
import { submitReceipt } from "../../services/submitReceipt";
import { ImageLike, Page } from "tesseract.js";
import TextManipulator from "../TextManipulator/TextManipulator";

interface NewReceiptProps extends WithStyles<typeof newReceiptStyle> {
}

interface Receipt {
    [index: string]: any;

    text: string;
    image: ImageLike;
    tesseract: Page
}

interface initialStateInterface {
    receipt: Receipt;
    snackBar: {
        message: ReactElement<any>,
        open: boolean
    };
    showProgressBar: boolean
}

const initialState: initialStateInterface = {
    receipt: {
        image: null,
        tesseract: null,
        text: ""
    },
    snackBar: {
        message: <span/>,
        open: false
    },
    showProgressBar: false
};


type State = Readonly<typeof initialState>;

class NewReceipt extends Component<NewReceiptProps, {}> {

    readonly state: State = initialState;


    private handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.target);
        const receipt = this.state.receipt;
        const response = await submitReceipt(receipt);
        if (response.hasOwnProperty("error")) {
            this.displaySnackBarMessage(response.error);
        } else {
            this.setState(() => ({...initialState}));
            this.displaySnackBarMessage(response.message);
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

    private toggleProgressBar = (toShow?: boolean) => {
        if (toShow) {
            this.setState(() => ({showProgressBar: toShow}));
        } else {
            // @ts-ignore
            this.setState((prevState) => ({showProgressBar: !prevState.showProgressBar}));
        }
    };

    private handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;

        this.setState((prevState) => ({
            receipt: {
                // @ts-ignore
                ...prevState.receipt,
                text
            }
        }));
    };

    private addImage = (image: ImageLike) => {
        console.log(image);
        this.setState((prevState) => ({
            receipt: {
                // @ts-ignore
                ...prevState.receipt,
                image: <img src={URL.createObjectURL(image)}/>
            }
        }));
    };

    private setTesseractResult = (tesseract: Page) => {
        this.setState((prevState) => ({
            receipt: {
                // @ts-ignore
                ...prevState.receipt,
                tesseract
            }
        }));
    };

    private setTextFromTesseract = (tesseract: Page) => {
        const text = tesseract.text;
        this.setState((prevState) => ({
            receipt: {
                // @ts-ignore
                ...prevState.receipt,
                text
            }
        }));
    };

    private fileChangeHandler = (files: FileList) => {

        const image = files[0];
        this.toggleProgressBar();
        this.addImage(image);
        Tesseract.recognize(image)
            .then((result) => {
                this.setTesseractResult(result);
                this.setTextFromTesseract(result);
                this.toggleProgressBar();
            });
    };

    private reset = () => {
        this.setState(() => (initialState));
    };

    public render(): JSX.Element {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <form onSubmit={this.handleSubmit} onReset={this.reset}>
                    {this.state.showProgressBar ? <CircularProgress className={classes.progress} size={50}/> : null}
                    <input type="file" onChange={(e) => {
                        this.fileChangeHandler(e.target.files);
                    }}/>
                    <TextManipulator
                        id="text"
                        name="text"
                        label="Receipt Text"
                        initialText={this.state.receipt.text}
                        onChange={this.handleTextChange}
                    />

                    <Button className={classes.submitButton} color='primary' type="submit">Submit Form</Button>
                    <Button className={classes.submitButton} color='primary' type="reset">Clear Form</Button>
                </form>
                <div>{this.state.receipt.image}</div>
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