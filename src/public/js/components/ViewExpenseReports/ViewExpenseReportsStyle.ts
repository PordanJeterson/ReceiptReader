import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import { SharedStyle } from "../SharedStyle";

const viewExpenseReportsStyle = (theme: Theme) => createStyles(
    {
        ...SharedStyle,
        card: {
            [theme.breakpoints.down('sm')]: {
                width: '95%'
            },
            [theme.breakpoints.up('sm')]: {
                width: '600px'
            },
        }
    });

export default viewExpenseReportsStyle;