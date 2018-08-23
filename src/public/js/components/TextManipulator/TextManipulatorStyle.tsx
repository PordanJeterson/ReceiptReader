import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";

const TextManipulatorStyle = (theme: Theme) => createStyles(
    {
        root: {
            display: 'flex',
            flexWrap: 'nowrap'
        },
        textArea: {
            resize: 'none',
            flexBasis: '80%',
            lineHeight: '3em'
        },
        deleteElements: {
            display: 'flex',
            flexFlow: 'column',
            flexBasis: '10%'
        },
        deleteElement: {
        }
    });

export default TextManipulatorStyle;