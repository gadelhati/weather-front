import { stitches } from "../global.styles"

const { styled } = stitches

export const Header = styled('div', {
    display: 'flex',
    height: '5rem',
    margin: '$xxs',
    padding: '0 $sm 0 $sm',
    color: '$fourth',
    borderRadius: '.3rem',
    borderLeft: 'solid $fourth .5em',
    boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .25rem #AAA inset',
    justifyContent: 'space-between',
    alignItems: 'center',
    'span': {
        display: 'flex',
        alignItems: 'center',
    },
    '@bp1': {
        'button': {
            fontSize: '75%',
        },
    },
})

export const TitleHeader = styled('div', {
    display: 'inline-block',
    padding: '$sm',
    paddingLeft: '$md',
    flexDirection: 'row',
    color: '$tenthth',
})