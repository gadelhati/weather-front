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
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23), 0 0 5px #aaa inset',
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