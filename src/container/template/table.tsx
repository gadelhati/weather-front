import { stitches } from "../global.styles"

const { styled } = stitches

export const Table = styled('table', {
    fontFamily: 'arial, sans-serif',
    fontSize: '0.9em',
    color: '$dark',
    padding: '$sm',
    margin: '$sm',
    boxSizing: 'border-box',
    borderSpacing: '0',
    backgroundColor: '$six1',
    borderRadius: '10px',
    display: 'block',
    borderCollapse: 'collapse',
    border: 'solid $two1 1px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    'thead > tr:first-child': {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '$even',
    },
    'td, th': {
        borderBottom: '1px solid $line',
        paddingLeft: '1em',
        textAlign: 'left',
        height: '3em',
        width: '10%',
    },
    'tr:nth-child(even)': {
        backgroundColor: '$even',
    },
    'tr:nth-child(odd)': {
        backgroundColor: '$odd',
    },
    'tr:hover': {
        cursor: 'pointer',
        backgroundColor: '$selected',
    },
})