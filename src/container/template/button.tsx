import { stitches } from "../global.styles"

const { styled } = stitches

export const Button = styled('button', {
    width: '5.5rem',
    maxHeight: '4em',
    backgroundImage: 'linear-gradient($third, $fourth)',
    border: '0',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, .3) 0 5px 15px',
    boxSizing: 'border-box',
    color: '$ninth',
    cursor: 'pointer',
    fontSize: '$rg',
    fontFamily: 'Montserrat, sans-serif',
    margin: '$xxs',
    padding: '$xs $xxs',
    textAlign: 'center',
    userSelect: 'none',
    touchAction: 'manipulation',
    '&:hover': {
        boxShadow: '0 0 1em hsla(0, 0%, 0.0%, 0.75000)',
    },
    '&:focus': {
        outline: '3px solid $ninth',
    },
    '&:active': {
        boxShadow: 'lightGray 0 3px 7px inset',
        transform: 'translateY(2px)',
    },
    variants: {
        category: {
            primary: {
                backgroundImage: 'linear-gradient($tprimary, $primary)',
            },
            secondary: {
                backgroundImage: 'linear-gradient($secondary, $secondary)',
            },
            success: {
                backgroundImage: 'linear-gradient($tsuccess, $success)',
            },
            danger: {
                backgroundImage: 'linear-gradient($tdanger, $danger)',
            },
            warning: {
                color: '$one1',
                backgroundImage: 'linear-gradient($twarning, $warning)',
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