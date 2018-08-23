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

const AddReceiptLink = (props: any) => <Link to="/new" {...props}><NoteAdd/>Add Receipt</Link>;
const ViewExpenseReportLink = (props: any) => <Link to="/leads" {...props}><ViewList/>Expense Report</Link>;

class NavBar extends Component<NavBarProps, {}> {

    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <AppBar>
                <div className={classes.root}>
                    <Button component={AddReceiptLink} classes={{root: classes.button}} size="large">Add Receipt</Button>
                    <Button component={ViewExpenseReportLink} classes={{root: classes.button}} size="large">View Expense Reports</Button>
                </div>
            </AppBar>
        );
    }
}

export default withStyles(navBarStyle)(NavBar);
