import { keyframes } from "@stitches/react"
import { stitches } from "../global.styles"

const { styled } = stitches

const show_toast = keyframes ({
    '0%': { transform: 'translateX(100%)', },
    '40%': { transform: 'translateX(-5%)', },
    '80%': { transform: 'translateX(0%)', },
    '100%': { transform: 'translateX(-10px)', },
})
const hide_toast = keyframes ({
    '0%': { transform: 'translateX(-10px)', },
    '40%': { transform: 'translateX(0%)' },
    '80%': { transform: 'translateX(-5%)' },
    '100%': { transform: 'translateX(calc(100% + 20px))' },
})
const progress = keyframes ({
    '100%': { width: '0%', },
})

export const Toast = styled('ul', {
    zIndex: '1',
    position: 'fixed',
    top: '30px',
    right: '20px',
    ':where(li, .column)': {
        display: 'flex',
        alignItems: 'center',
    },
    '.success': {
        border: '$fourteenth solid 0.1rem',
        borderLeft: '$fourteenth solid 1rem',
        '::before': {
            background: '$fourteenth',
        },
        '.column i': {
            color: '$fourteenth',
        }
    },
    '.error': {
        border: 'red solid 0.1rem',
        borderLeft: 'red solid 1rem',
        color: 'red',
        '::before': {
            background: '$seventeenth',
        },
        '.column i': {
            color: '$seventeenth',
        },   
   
    },
    '.warning': {
        border: '$nineteenth solid 0.1rem',
        borderLeft: '$nineteenth solid 1rem',
        '::before': {
            background: '$nineteenth',
        },
        '.column i': {
            color: '$nineteenth',
        }
    },
    '.info': {
        border: '$twentieth solid 0.1rem',
        borderLeft: '$twentieth solid 1rem',
        '::before': {
            background: '$twentieth',
        },
        '.column i': {
            color: '$twentieth',
        }
    },
    '.hide': {
        animation: `${hide_toast} 0.3s ease forwards`,
    },
    '.column i': {
        fontSize: '$lg',
    },
    '.column span': {
        fontSize: '$rg',
        marginLeft: '12px',
    },
    'i:last-child': {
        color: '#aeb0d7',
        cursor: 'pointer',
    },
    'i:last-child:hover': {
        color: '$twelfth',
    },
    li: {
        width: '400px',
        position: 'relative',
        overflow: 'hidden',
        listStyle: 'none',
        borderRadius: '.3rem',
        padding: '16px 17px',
        marginBottom: '10px',
        background: `$tenth`,
        justifyContent: 'space-between',
        animation: `${show_toast} 0.3s ease forwards`,
        '.column p': {
            paddingLeft: '20px',
        }, 
        '::before': {
            position: 'absolute',
            content: "",
            height: '3px',
            width: '100%',
            bottom: '0px',
            left: '0px',
            animation: `${progress} 5s linear forwards`,
        },
    },
})