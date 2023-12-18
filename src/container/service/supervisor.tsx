import { keyframes } from "@stitches/react"
import { stitches } from "../global.styles"

const { styled } = stitches

const hide_toast = keyframes ({
    '0%': { transform: 'translateX(-10px)', },
    '40%': { transform: 'translateX(0%)' },
    '80%': { transform: 'translateX(-5%)' },
    '100%': { transform: 'translateX(calc(100% + 20px))' },
})

export const Supervisor = styled('div', {
    variants: {
        color: {
            one: {
                backgroundColor: '$one',
            },
            two: {
                backgroundColor: '$two',
            },
            three: {
                backgroundColor: '$three',
            },
            four: {
                backgroundColor: '$four',
            },
            five: {
                backgroundColor: '$five',
            },
            six: {
                backgroundColor: '$six',
            },
            seven: {
                backgroundColor: 'red',
            },
        },
    },
})