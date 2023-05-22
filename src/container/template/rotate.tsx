import { keyframes } from "@stitches/react"
import { stitches } from "../global.styles"

const { styled } = stitches

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotateY(360deg)' }
});

export const Rotate = styled('img', {  
    animation: `${spin} 4s linear infinite`,
})