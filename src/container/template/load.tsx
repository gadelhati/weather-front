import { keyframes } from "@stitches/react"
import { stitches } from "../global.styles"

const { styled } = stitches

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
});

export const Load = styled('div', {
    border: '6px dotted $five1',
    borderTop: '6px dotted $three1',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: `${spin} 2s linear infinite`,
})