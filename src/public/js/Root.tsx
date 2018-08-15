import * as React from 'react';
import {Component, Fragment} from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import {cyan, blueGrey} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: cyan,
        secondary: blueGrey
    }
});

export default class Root extends Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}