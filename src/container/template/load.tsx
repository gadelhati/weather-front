import { keyframes } from "@stitches/react"
import { stitches } from "../global.styles"

const { styled } = stitches

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
});

export const Load = styled('div', {
    border: '6px dotted $ninth',
    borderTop: '6px dotted $fourth',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: `${spin} 2s linear infinite`,
})