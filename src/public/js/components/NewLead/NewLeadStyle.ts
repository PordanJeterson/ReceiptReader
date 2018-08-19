import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import { SharedStyle } from "../SharedStyle";

const newLeadStyle = (theme: Theme) => createStyles(
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

        }
    });

export default newLeadStyle;