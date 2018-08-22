import * as React from "react";
import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

import { getLeads } from "../../services";
import { prettyNames } from "../../constants";
import { NewLeadInterface } from "../../interfaces";
import ViewLeadsStyle from "./ViewLeadsStyle";

interface HomeProps extends WithStyles<typeof ViewLeadsStyle> {
}

interface InitialState {
    leads: NewLeadInterface[]
}

const initialState: InitialState = {
    leads: []
};

type State = Readonly<typeof initialState>;

class ViewLeads extends Component<HomeProps, {}> {

    readonly state: State = initialState;

    componentDidMount = () => {
        this.leadGen();
    };

    private leadGen = async () => {
        const leads = await getLeads();
        this.setState(() => ({...leads}));
    };

    private listItem = (item: [string, string]) => {
        return (
            <ListItem key={item[0]}>
                <ListItemText>{prettyNames[item[0]]}</ListItemText>
                <ListItemText>{item[1]}</ListItemText>
            </ListItem>
        );
    };

    private leadCard = (lead: NewLeadInterface) => {
        const leadKeyValuePairs = Object.entries(lead);
        return (
            <Card className={this.props.classes.card} key={lead.firstName}>
                <CardContent>
                    <Typography color="textSecondary">
                        Lead
                    </Typography>
                    <List>
                        {leadKeyValuePairs.map(this.listItem)}
                    </List>
                </CardContent>
            </Card>
        );
    };

    private listLeads = () => {
        return this.state.leads.map((lead) => (this.leadCard(lead)));
    };

    public render(): JSX.Element {
        const {classes} = this.props;
        const leads = this.listLeads();
        return (
            <div className={classes.root}>
                <div>
                    {leads}
                </div>
            </div>
        );
    }
}

export default withStyles(ViewLeadsStyle)(ViewLeads);