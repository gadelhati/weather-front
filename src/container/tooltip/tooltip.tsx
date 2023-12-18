import { stitches } from '../global.styles'

const { styled } = stitches

export const Tooltip = styled('div',{
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'all .25s ease-in-out',
    zIndex: '1',
    '&:before': {
        content: 'attr(data-tip)',
        fontSize: '$rg',
        position: 'absolute',
        background: '$twelfth',
        lineHeight: '1.2em',
        padding: '0.5em',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all .3s ease-in-out',
        letterSpacing: '0',
        fontWeight: 'bold',
        right: '0',
        top: '50%',
        transform: 'translate(calc(100% + 8px), -50%)',
        boxSizing: 'border-box',
        borderRadius: '.25rem',
    },
    '&:after': {
        borderStyle: 'solid',
        content: '',
        position: 'absolute',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all .3s ease-in-out',
        borderWidth: '8px 8px 8px 0',
        borderColor: 'transparent $twelfth transparent transparent',
        right: '-8px',
        top: '50%',
        transform: 'translate(0, -50%)',
    },
    '&:hover:before, &:hover:after': {
        color: '$ninth',
        visibility: 'visible',
        opacity: '1',
    },
    '[data-tip!=[]]': {
        background: 'yellow',
    },
    variants: {
        hidden: {
            false: {
                'input': {
                    backgroundColor: '$fifteenth',
                },
                borderRadius: '.25rem',
            },
            true: {
                '&:before, &:after': {
                    display: 'none',
                },
            },
        },
    },
})