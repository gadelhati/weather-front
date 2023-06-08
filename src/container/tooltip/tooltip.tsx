import { stitches } from '../global.styles'

const { styled } = stitches

export const Tooltip = styled('div',{
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    boxSizing: 'border-box',
    fontStyle: 'normal',
    transition: 'all .25s ease-in-out',
    '&:before': {
        content: 'attr(data-tip)',
        fontSize: '14px',
        position: 'absolute',
        background: '$twelfth',
        lineHeight: '1.2em',
        padding: '0.5em',
        fontStyle: 'normal',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all .3s ease-in-out',
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: '0',
        fontWeight: '600',
        right: '0',
        top: '50%',
        transform: 'translate(calc(100% + 8px), -50%)',
        boxSizing: 'border-box',
        borderRadius: '3px',
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
                color: '$fifth',
                border: '3px solid $danger',
                borderRadius: '0.5em',
            },
            true: {
                '&:before, &:after': {
                    display: 'none',
                },
            },
        },
    },
})