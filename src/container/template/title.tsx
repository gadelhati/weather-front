import { stitches } from "../global.styles"

const { styled } = stitches

export const Title = styled('div', {
    display: 'flex',
    height: '5em',
    // background: '$even',

    fontFamily: 'arial, sans-serif',
    fontSize: '0.9em',
    color: '$dark',
    padding: '$sm',
    margin: '$sm',
    boxSizing: 'border-box',
    borderSpacing: '0',
    backgroundColor: '$six1',
    borderRadius: '10px',
    // display: 'block',
    borderCollapse: 'collapse',
    border: 'solid $third 1px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
})