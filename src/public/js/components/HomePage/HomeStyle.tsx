import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import {SharedStyle} from "../SharedStyle";

const homeStyle = (theme: Theme) => createStyles(
    {
        ...SharedStyle
    });

export {homeStyle};
export default homeStyle;