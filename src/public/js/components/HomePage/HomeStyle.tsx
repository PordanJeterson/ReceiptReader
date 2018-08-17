import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";

const homeStyle = (theme: Theme) => createStyles(
    {
        appBar: {
            "height": "3em"
        }
    });

export default homeStyle;