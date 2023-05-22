import { stitches } from "../global.styles"

const { styled } = stitches

export const Button = styled('button', {
    width: '6em',
    maxHeight: '4em',
    backgroundImage: 'linear-gradient($three1, $one1)',
    border: '0',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, .3) 0 5px 15px',
    boxSizing: 'border-box',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'Montserrat,sans-serif',
    fontSize: '.9em',
    margin: '5px',
    padding: '10px 15px',
    textAlign: 'center',
    userSelect: 'none',
    touchAction: 'manipulation',
    '&:hover': {
        boxShadow: '0 0 1em hsla(0, 0%, 0.0%, 0.75000)',
    },
    '&:focus': {
        outline: '3px solid $six',
    },
    '&:active': {
        boxShadow: 'lightGray 0 3px 7px inset',
        transform: 'translateY(2px)',
    },
    variants: {
        category: {
            primary: {
                backgroundImage: '$one',
            },
            secondary: {
                backgroundImage: 'linear-gradient($three, $one)',
            },
            success: {
                backgroundImage: '$three',
            },
            danger: {
                backgroundImage: '$four',
            },
            warning: {
                backgroundImage: '$five',
            },
            info: {
                backgroundImage: '$six',
            },
            light: {
                backgroundImage: '$selected',
            },
            dark: {
                backgroundImage: '$selected',
            },
            muted: {
                backgroundImage: '$selected',
            },
        },
    },
})

export const GroupButton = styled('div', {
    'button:first-child': {
        borderRadius: '5px 0px 0px 5px',
    },
    'button:last-child': {
        borderRadius: '0px 5px 5px 0px',
    },
})

export const ButtonPage = styled('button', {
    backgroundColor: '$six1',
    fontFamily: 'Montserrat,sans-serif',
    height: '2.5em',
    width: '2.5em',
    border: 'solid $line 1px',
    variants: {
        selected: {
            true: {
                color: '$selected',
                backgroundColor: '$blueButton',
            },
        },
    },
})