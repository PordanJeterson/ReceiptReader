import * as React from "react";
import { Route } from "react-router-dom";
import Root from "./Root";
import { HomePage, NewLead, ViewLeads } from "./components";
import NavBar from "./components/NavBar/NavBar";

export const Routes = (
    <Root>
        <div>
            <NavBar/>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/new" component={NewLead}/>
            <Route exact path="/leads" component={ViewLeads}/>
        </div>
    </Root>
);