import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import { SharedStyle } from "../SharedStyle";

const newReceiptStyle = (theme: Theme) => createStyles(
    {
        ...SharedStyle,
        formInput: {
            [theme.breakpoints.down('sm')]: {
                width: '95%'
            },
            [theme.breakpoints.up('sm')]: {
                width: '400px'
            },
            paddingTop: '20px',

        },
        submitButton: {
            backgroundColor: theme.palette.primary.contrastText,
            marginTop: '20px'
        },
        progress: {
            margin: theme.spacing.unit * 2
        },
        textManipulator: {}
    });

export default newReceiptStyle;