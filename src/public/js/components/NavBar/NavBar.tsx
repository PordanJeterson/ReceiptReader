import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles, WithStyles, AppBar, Button } from "@material-ui/core";

import navBarStyle from "./NavBarStyle";
import { NoteAdd, ViewList } from "@material-ui/icons";

interface NavBarProps extends WithStyles<typeof navBarStyle> {
}

const NewLeadLink = (props: any) => <Link to="/new" {...props}>New Lead</Link>;
const ViewLeadsLink = (props: any) => <Link to="/leads" {...props}>View Leads</Link>;

class NavBar extends Component<NavBarProps, {}> {

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <AppBar>
                <div className={classes.root}>
                    <Button component={NewLeadLink} classes={{root: classes.button}} size="large"><NoteAdd/> New
                        Lead</Button>
                    <Button component={ViewLeadsLink} classes={{root: classes.button}} size="large"><ViewList/> View
                        Leads</Button>
                </div>
            </AppBar>
        );
    }
}

export default withStyles(navBarStyle)(NavBar);
