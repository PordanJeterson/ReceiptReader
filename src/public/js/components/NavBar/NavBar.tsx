import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button/Button";

import navBarStyle from "./NavBarStyle";
import NoteAdd from "@material-ui/icons/NoteAdd";
import ViewList from "@material-ui/icons/ViewList";

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
