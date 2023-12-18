import { keyframes } from "@stitches/react"
import { stitches } from "../global.styles"

const { styled } = stitches

const animatetop = keyframes({
    'from': { top: '-300px', opacity: '0' },
    'to': { top: '0', opacity: '1' }
});

export const Modal = styled('div', {
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    'article': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        center: {
            height: '22rem',
        },
        minHeight: '28rem',
        maxHeight: '90vh',
        minWidth: '32rem',
        maxWidth: '95%',
        backgroundColor: '$ninth',
        margin: 'auto',
        border: '1px solid $twelfth',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
        animationName: `${animatetop}`,
        animationDuration: '0.4s',
        borderRadius: '.5rem .5rem .3rem .3rem',
        '.show': {
            // backgroundColor: '#354F52',
            backgroundColor: '$ninth',
            border: 'none',
            // padding: '2vh',
            padding: '1rem',
            margin: '0rem .5rem',
            fontSize: '1rem',
            // color: 'white',
            color: '$first',
            // fontFamily: 'roboto',
            boxSizing: 'border-box',
            // boxShadow: '2px 1px 1px 0px rgb(100, 100, 100)',
            zIndex: '1',
            width: '20vh',
            transition: 'margin .25s ease-in-out',
        },
        '.inative': {
            border: 'none',
            margin: '0rem .1rem',
            width: '20vh',
            fillOpacity: '50%',
        },
        '.tab': {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '0.1vh',
        },
        '.tabs': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '$eleventh',
            padding: '1rem 1rem 0 1rem',
            'button': {
                borderRadius: '1rem 1rem 0rem 0rem',
            },
        },
        '.hide': {
            display: 'none',
        },
    },
    'span': {
        color: '$eleventh',
        float: 'right',
        fontSize: '$lg',
        fontWeight: 'bold',
        '&:hover, &:focus': {
            color: 'black',
            textDecoration: 'none',
            cursor: 'pointer',
        },
    },
    'header': {
        color: '$sixth',
        width: '100%',
        padding: '2px 16px',
        margin: '0 auto',
        backgroundColor: '$third',
        borderRadius: '.3rem .3rem 0 0',
    },
    'footer': {
        display: 'flex',
        height: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: '0 0 .5rem .5rem',
    },
    variants: {
        show: {
            false: {
                display: 'none',
            },
            true: {
                display: 'flex',
            },
        },
        confirm: {
            true: {
                'article': {
                    minHeight: '10rem',
                }
            },
        },
        weather: {
            true: {
                'article': {
                    height: '35rem',
                    width: '100%',
                }
            },
        },
    },
})