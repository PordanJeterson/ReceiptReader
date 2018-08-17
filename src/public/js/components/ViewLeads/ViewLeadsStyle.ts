import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import { SharedStyle } from "../SharedStyle";

const viewLeadsStyle = (theme: Theme) => createStyles(
    {
        ...SharedStyle
    });

export default viewLeadsStyle;