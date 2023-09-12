import { stitches } from "../global.styles"

const { styled } = stitches

export const Table = styled('table', {
    fontSize: '$rg',
    color: '$seventeenth',
    padding: '$sm',
    margin: '$xxs',
    marginLeft: '15px',
    marginRight: '15px',
    boxSizing: 'border-box',
    borderSpacing: '0',
    backgroundColor: '$tenth',
    borderRadius: '.3rem',
    display: 'block',
    borderCollapse: 'collapse',
    // border: 'solid $third 1px',
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
        width: '2%',
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