import { stitches } from "../global.styles"

const { styled } = stitches

export const Button = styled('button', {
    width: '5.5rem',
    maxHeight: '4em',
    // aquivo original backgroundImage: 'linear-gradient($third, $fourth)',
    backgroundColor: '$nineteenth',
    border: '0',
    borderRadius: '.3rem',
    boxShadow: 'rgba(0, 0, 0, .3) 0 8px 10px',
    boxSizing: 'border-box',
    color: '$even',
    //color: '$ninth',
    cursor: 'pointer',
    fontSize: '$rg',
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
                // backgroundColor: '$eleventh',
                backgroundColor: 'transparent',
                color: 'tomato',
                border: '1px solid tomato',
                // marginTop: '-280px',
            },
            success: {
                backgroundImage: 'linear-gradient($tsuccess, $success)',
                
            },
            danger: {
                backgroundImage: 'linear-gradient($tdanger, $danger)',
                // marginTop: '-280px',

            },
            warning: {
                color: '$second',
                backgroundColor: '#588FEB',
                // marginTop: '-280px',

            },
            info: {
                backgroundImage: '$tenth',
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
        borderRadius: '.3rem 0 0 .3rem',

    },
    'button:last-child': {
        borderRadius: '0 .3rem .3rem 0',
    },
})

export const ButtonPage = styled('button', {
    backgroundColor: '$tenth',
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