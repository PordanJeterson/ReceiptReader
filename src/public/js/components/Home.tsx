import * as React from "react";
import { Component } from "react";
import { withStyles, AppBar } from "@material-ui/core";

import { Tesseract } from './Tesseract';
import homeStyle from "./HomeStyle";

interface HomeProps {
    classes: any;
}

class Home extends Component<HomeProps, {}> {

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div>
                <AppBar>
                    Test
                </AppBar>
                <div className={classes.root}>
                    Tesseract!
                    <Tesseract/>
                </div>
            </div>
        );
    }
}

export default withStyles(homeStyle)(Home);