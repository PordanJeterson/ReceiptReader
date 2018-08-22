import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import { SharedStyle } from "../SharedStyle";

const homeStyle = (theme: Theme) => createStyles(
    {
        ...SharedStyle
    });

export { homeStyle };
export default homeStyle;