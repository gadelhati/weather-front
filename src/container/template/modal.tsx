import { keyframes } from "@stitches/react"
import { stitches } from "../global.styles"

const { styled } = stitches

const animatetop = keyframes({
    'from': { top: '-300px', opacity: '0' },
    'to': { top: '0', opacity: '1' }
});

export const Modal = styled('div', {
    color: 'gray',
    display: 'none',
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    minWidth: '100vw',
    minHeight: '100vh',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    'article': {
        minHeight: '4vh',
        minWidth: '50vw',
        backgroundColor: '#dedede',
        margin: 'auto',
        border: '1px solid #888',
        maxWidth: '80%',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
        animationName: `${animatetop}`,
        animationDuration: '0.4s',
        borderRadius: '.5rem',
    },
    'span': {
        color: '#aaa',
        float: 'right',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        '&:hover, &:focus': {
            color: 'black',
            textDecoration: 'none',
            cursor: 'pointer',
        },
    },
    'header': {
        color: 'LightGray',
        padding: '2px 16px',
        margin: '0 auto',
        backgroundColor: '$third',
        // color: 'white',
        borderRadius: '.5rem .5rem 0 0',
        'h2': {
            color: 'LightGray'
        },
    },
    'footer': {
        // padding: '2px 16px',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '$second',
        color: 'white',
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
    },
})