import { stitches } from "../global.styles"

const { styled } = stitches

export const Header = styled('div', {
    display: 'flex',
    height: '5rem',
    fontFamily: 'Montserrat, sans-serif',
    margin: '$xxs',
    paddingRight: '$sm',
    backgroundColor: '$tenth',
    borderRadius: '7px',
    borderCollapse: 'collapse',
    border: 'solid $third 1px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    variants: {
        align: {
            column: {
                display: 'inline-block',
            },
            line: {
                height: '.5em',
            },
            buttons: {
                height: '10em',
            },
        },
    },
})

export const TitleHeader = styled('div',{
    display: 'inline-block',
    padding: '$sm',
    paddingLeft: '$md',
    flexDirection: 'row',
    color: '$sixth',
})