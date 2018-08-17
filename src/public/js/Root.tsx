import * as React from "react";
import { Component, Fragment } from "react";

export default class Root extends Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        );
    }
}