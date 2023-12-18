import { stitches } from "../global.styles"

const { styled } = stitches

export const Card = styled('div', {
    display: 'flex',
    height: '10rem',
    minWidth: '15rem',
    maxWidth: '20rem',
    margin: '$xxs',
    padding: '0 $sm 0 $sm',
    color: '$third',
    backgroundColor: '$tenth',
    borderRadius: '.3rem',
    // borderCollapse: 'collapse',
    // border: 'solid $third .5px',
    borderLeft: 'solid $fourth .5em',
    boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .25rem #AAA inset',
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
    'a' : {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '$fourth',
        textDecoration: 'none',
    },
    '@bp1': {
        'button': {
            fontSize: '75%',
        },
    },
})

export const CardContainer = styled('div', {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
})