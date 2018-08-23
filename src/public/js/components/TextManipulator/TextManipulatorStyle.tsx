import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import { light } from "@material-ui/core/styles/createPalette";

const TextManipulatorStyle = (theme: Theme) => {
    const placeholder = {
        color: 'currentColor',
        opacity: light ? 0.42 : 0.5,
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.shorter,
        }),
    };

    const placeholderHidden = {
        opacity: 0,
    };


    const placeholderVisible = {
        opacity: light ? 0.42 : 0.5,
    };

    return createStyles(
        {
            root: {
                display: 'flex',
                flexWrap: 'nowrap'
            },
            formControl: {
                'label + &': {
                    marginTop: 16,
                },
            },
            disabled: {},
            input: {
                // Mimics the default input display property used by browsers for an input.
                display: 'inline-flex',
                position: 'relative',
                fontFamily: theme.typography.fontFamily,
                color: theme.palette.text.primary,
                fontSize: theme.typography.pxToRem(16),
                flexBasis: '80%',
                '&$disabled': {
                    color: theme.palette.text.disabled,
                },
            },
            textArea: {
                resize: 'none',
                padding: 0,
                lineHeight: '2.5em',
                font: 'inherit',
                color: 'currentColor',
                border: 0,
                boxSizing: 'content-box',
                verticalAlign: 'middle',
                background: 'none',
                margin: 0, // Reset for Safari
                // Remove grey highlight
                WebkitTapHighlightColor: 'transparent',
                // Make the flex item shrink with Firefox
                flexGrow: 1,
                '&::-webkit-input-placeholder': placeholder,
                '&::-moz-placeholder': placeholder, // Firefox 19+
                '&:-ms-input-placeholder': placeholder, // IE 11
                '&::-ms-input-placeholder': placeholder, // Edge
                '&:focus': {
                    outline: 0,
                },
                // Reset Firefox invalid required input style
                '&:invalid': {
                    boxShadow: 'none',
                },
                '&::-webkit-search-decoration': {
                    // Remove the padding when type=search.
                    '-webkit-appearance': 'none',
                },
                // Show and hide the placeholder logic
                'label[data-shrink=false] + $formControl &': {
                    '&::-webkit-input-placeholder': placeholderHidden,
                    '&::-moz-placeholder': placeholderHidden, // Firefox 19+
                    '&:-ms-input-placeholder': placeholderHidden, // IE 11
                    '&::-ms-input-placeholder': placeholderHidden, // Edge
                    '&:focus::-webkit-input-placeholder': placeholderVisible,
                    '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
                    '&:focus:-ms-input-placeholder': placeholderVisible, // IE 11
                    '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
                },
                '&$disabled': {
                    opacity: 1, // Reset iOS opacity
                },
            },
            deleteElements: {
                display: 'flex',
                flexFlow: 'column',
                flexBasis: '10%'
            },
            deleteElement: {},

        });
};

export default TextManipulatorStyle;