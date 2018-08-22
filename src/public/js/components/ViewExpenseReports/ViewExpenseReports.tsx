import * as React from "react";
import { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

import ViewExpenseReportsStyle from "./ViewExpenseReportsStyle";

interface HomeProps extends WithStyles<typeof ViewExpenseReportsStyle> {
}

interface InitialState {
    something: []
}

const initialState: InitialState = {
    something: []
};

type State = Readonly<typeof initialState>;

class ViewExpenseReports extends Component<HomeProps, {}> {

    readonly state: State = initialState;

    componentDidMount = () => {
    };


    public render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                Expense reports go here
            </div>
        );
    }
}

export default withStyles(ViewExpenseReportsStyle)(ViewExpenseReports);