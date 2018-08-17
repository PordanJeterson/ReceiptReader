import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";

const navBarStyle = (theme: Theme) => createStyles(
    {
        root: {
            alignItems: "center",
            display: "flex",
            height: "30px",
            [theme.breakpoints.down('sm')]: {
                justifyContent: "center",

            },
            [theme.breakpoints.up('md')]: {
                paddingLeft: "65px"
            }
        },
        button: {
            backgroundColor: theme.palette.primary.light,
            margin: theme.spacing.unit
        }
    });

export default navBarStyle;