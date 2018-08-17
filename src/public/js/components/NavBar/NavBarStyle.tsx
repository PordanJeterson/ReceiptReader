import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";

const navBarStyle = (theme: Theme) => createStyles(
    {
        root: {
            "paddingTop": "20px",
        },
        appBar: {
            "height": "3em"
        }
    });

export default navBarStyle;