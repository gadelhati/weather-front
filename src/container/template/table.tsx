import { stitches } from "../global.styles"

const { styled } = stitches

export const Table = styled('table', {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.9em',
    color: '$seventeenth',
    padding: '$sm',
    margin: '$xxs',
    boxSizing: 'border-box',
    borderSpacing: '0',
    backgroundColor: '$tenth',
    borderRadius: '8px',
    display: 'block',
    borderCollapse: 'collapse',
    border: 'solid $third 1px',
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