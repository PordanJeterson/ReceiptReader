import * as React from "react";
import * as ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { cyan, blueGrey } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: cyan,
        secondary: blueGrey
    }
});

ReactDom.render(
    <AppContainer>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter children={Routes}/>
        </MuiThemeProvider>
    </AppContainer>,
    document.getElementById("react-app")
);