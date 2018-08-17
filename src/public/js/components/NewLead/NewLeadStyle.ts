import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import { SharedStyle } from "../SharedStyle";

const newLeadStyle = (theme: Theme) => createStyles(
    {
        ...SharedStyle
    });

export default newLeadStyle;