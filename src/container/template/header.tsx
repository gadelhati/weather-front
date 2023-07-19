import { stitches } from "../global.styles"

const { styled } = stitches

export const Header = styled('div', {
    display: 'flex',
    height: '5rem',
    margin: '$xxs',
    padding: '0 $sm 0 $sm',
    color: '$third',
    backgroundColor: '$tenth',
    borderRadius: '.3rem',
    // borderCollapse: 'collapse',
    // border: 'solid $third 1px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 5px',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexWrap: 'wrap',
})

export const TitleHeader = styled('div',{
    display: 'inline-block',
    padding: '$sm',
    paddingLeft: '$md',
    flexDirection: 'row',
    color: '$tenthth',
})