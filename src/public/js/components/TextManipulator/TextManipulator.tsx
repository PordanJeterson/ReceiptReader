import * as React from 'react';
import { Component, Props } from 'react';
import TextField from "@material-ui/core/TextField";
import { WithStyles } from "@material-ui/core/styles";
import textManipulatorStyle from './TextManipulatorStyle';
import { Close } from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

interface TextManipulatorProps extends WithStyles<typeof textManipulatorStyle> {
    id: string;
    name: string;
    label: string;
    initialText: string;
    onChange: (React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>);
}

interface initialStateInterface {
    [index: number]: []

    value: string;
    initialValue: string;
    splitText: string[];
    lineDeleteElements: JSX.Element[]
}

const initialState: initialStateInterface = {
    value: "",
    initialValue: null,
    splitText: [],
    lineDeleteElements: null
};


type State = Readonly<typeof initialState>;

class TextManipulator extends Component<TextManipulatorProps, {}> {

    state: State = initialState;

    componentDidUpdate = (prevProps: TextManipulatorProps) => {
        if (prevProps.initialText !== this.props.initialText) {
            this.setState(() => ({
                ...initialState,
                value: this.props.initialText
            }));
            if (this.props.initialText !== "") {
                this.processInitialText(this.props.initialText);
            }

        }
    };

    private processInitialText = (text: string) => {
        const splitText = this.splitTextByLines(text);
        const lineDeleteElements = splitText.map((value, index, array) => {
            return this.createDeletionLine(index);
        });
        this.setState(() => ({lineDeleteElements, splitText}));
    };

    private deleteLine = (index: number) => () => {
        // todo actually delete the line
        this.deleteLineFromList(index);
        this.deleteLineDelete(index);
    };

    private deleteLineDelete = (index: number) => {
        const lineElements = this.state.lineDeleteElements;
        lineElements[index] = null;
        this.setState(() => ({lineElements}));
    };

    private deleteLineFromList = (index: number) => {
        const splitText = this.state.splitText;
        console.log(splitText);
        splitText[index] = null;
        console.log(splitText);
        const newValue = splitText.filter((value) => (value !== null)).join('\n');
        console.log(newValue);
        this.setState(() => ({splitText, value: newValue}));
    };

    private createDeletionLine = (index: number) => {
        return <Button className={this.props.classes.deleteElement} key={index}
                       onClick={this.deleteLine(index)}><Close/></Button>;
    };

    private splitTextByLines = (text: string) => {
        return text.split('\n');
    };

    public render(): JSX.Element {
        const {id, name, label, onChange, classes} = this.props;

        return (
            <div className={classes.root}>
                <textarea
                    style={{
                        height: this.state.lineDeleteElements ? `${this.state.lineDeleteElements.length * 3}em` : `10em`
                    }}
                    className={classes.textArea}
                    value={this.state.value}
                    name={name}
                    id={id}
                />
                <div className={classes.deleteElements}>
                    {this.state.lineDeleteElements}
                </div>
            </div>
        );
    }

}


export default withStyles(textManipulatorStyle)(TextManipulator);
