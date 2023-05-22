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
    position: 'fixed',
    top: '30px',
    right: '20px',
    ':where(li, .column)': {
        display: 'flex',
        alignItems: 'center',
    },
    '.success': {
        border: '$tsuccess solid 0.1rem',
        borderLeft: '$tsuccess solid 1rem',
        '::before': {
            background: '$tsuccess',
        },
        '.column i': {
            color: '$tsuccess',
        }
    },
    '.error': {
        border: 'red solid 0.1rem',
        borderLeft: 'red solid 1rem',
        '::before': {
            background: '$terror',
        },
        '.column i': {
            color: '$terror',
        }
    },
    '.warning': {
        border: '$twarning solid 0.1rem',
        borderLeft: '$twarning solid 1rem',
        '::before': {
            background: '$twarning',
        },
        '.column i': {
            color: '$twarning',
        }
    },
    '.info': {
        border: '$tinfo solid 0.1rem',
        borderLeft: '$tinfo solid 1rem',
        '::before': {
            background: '$tinfo',
        },
        '.column i': {
            color: '$tinfo',
        }
    },
    '.hide': {
        animation: `${hide_toast} 0.3s ease forwards`,
    },
    '.column i': {
        fontSize: '1.75rem',
    },
    '.column span': {
        fontSize: '1.07rem',
        marginLeft: '12px',
    },
    'i:last-child': {
        color: '#aeb0d7',
        cursor: 'pointer',
    },
    'i:last-child:hover': {
        color: '$tdark',
    },
    li: {
        width: '400px',
        position: 'relative',
        overflow: 'hidden',
        listStyle: 'none',
        borderRadius: '4px',
        padding: '16px 17px',
        marginBottom: '10px',
        background: `$tlight`,
        justifyContent: 'space-between',
        animation: `${show_toast} 0.3s ease forwards`,
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