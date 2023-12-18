import { stitches } from "../global.styles"

const { styled } = stitches

export const Button = styled('button', {
    justifyContent: 'center',
    width: '6em',
    maxHeight: '4em',
    backgroundImage: 'linear-gradient($fourth, $second)',
    border: '0',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, .3) 0 5px 15px',
    boxSizing: 'border-box',
    color: '$sixth',
    cursor: 'pointer',
    fontFamily: 'Montserrat,sans-serif',
    fontSize: '.9em',
    margin: '5px',
    padding: '10px 1px',
    textAlign: 'center',
    userSelect: 'none',
    touchAction: 'manipulation',
    '&:hover': {
        boxShadow: '0 0 1em hsla(0, 0%, 0.0%, 0.75000)',
    },
    '&:focus': {
        outline: '3px solid $tenth',
    },
    '&:active': {
        boxShadow: 'lightGray 0 3px 7px inset',
        transform: 'translateY(2px)',
    },
    variants: {
        category: {
            primary: {
                backgroundImage: 'linear-gradient(#54b687, #268e84)',
            },
            secondary: {
                backgroundImage: 'linear-gradient($twelfth, $sixteenth)',
            },
            success: {
                backgroundImage: 'linear-gradient($fourteenth, $thirteenth)',
            },
            danger: {
                backgroundImage: 'linear-gradient($fifteenth, $seventeenth)',
            },
            warning: {
                color: '$sixteenth',
                backgroundImage: 'linear-gradient($eighteenth, $nineteenth)',
            },
            info: {
                backgroundImage: '$tenth',
            },
            light: {
                backgroundImage: '$seventh',
            },
            dark: {
                backgroundImage: '$seventh',
            },
            muted: {
                backgroundImage: '$seventh',
            },
            small: {
                paddingLeft: '.7rem',
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
    backgroundColor: '$tenth',
    fontFamily: 'Montserrat,sans-serif',
    height: '2.5em',
    width: '2.5em',
    border: 'solid $eighth 1px',
    variants: {
        selected: {
            true: {
                color: '$seventh',
                backgroundColor: '$fifth',
            },
        },
    },
})