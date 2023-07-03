import { stitches } from "../global.styles"

const { styled } = stitches

export const FloatLabel = styled('div', {
    fontSize: '$rg',
    fontFamily: 'Montserrat, sans-serif',
    margin: '$rg 0 0 0',
    padding: '$xs',
    'select': {
        width: '100%',
        position: 'relative',
        bottom: '15px',
    },
    'input': {
        width: '100%',
        color: '$tenth',
        fontSize: '100%',
        padding: '$sm',
        outline: 'none',
        border: 'none',
        borderBottom: '2px solid $ninth',
        backgroundColor: 'transparent',
    },
    'input[type="number"]': {
        appearance: 'textfield',
    },
    'label': {
        color: '$ninth',
        fontSize: '100%',
        position: 'absolute',
        left: '0',
        padding: '$sm',
        marginLeft: '$xs',
        pointerEvents: 'none',
        transition: 'all 0.3s ease',
    },
    'input:focus ~ div': {
        transform: 'scaleX(1)',
    },
    ':is(input:focus, input:valid, input:placeholder-shown)~label': {
        transform: 'translateY(-50%)',
        padding: '0.4em',
    },
    ':is(input:focus, input:valid)': {
        transition: 'all 0.3s ease',
        borderBottom: '2px solid $second',
    },
})

export const Container = styled('div', {
    display: 'flex',
    minHeight: '15em',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '$lg',
    variants: {
        align: {
            column: {
                display: 'inline-block',
            },
            line: {
                height: '.5em',
            },
            buttons: {
                minHeight: '6em',
            },
            response: {
                minHeight: '1rem',
                // display: 'inline-block',
            },
        },
    },
})

export const ContainerInput = styled('div', {
    overflowX: 'clip',
    'span': {
        fontFamily: 'Arial, Helvetica, sans-serif',
        position: 'relative',
        display: 'inline-block',
        margin: 'min(.2em) min(.2em) 0em 0em',
        minHeight: '2rem',
        heigth: '22em',
    },
    'select': {
        minHeight: '1.8em',
    },
    'input, select': {
        display: 'inline-block',
        width: '26em',
        padding: '10px 0 10px 35px',
        fontWeight: '400',
        color: '#377D6A',
        background: '#efefef',
        border: '0',
        borderRadius: '3px',
        outline: '0',
        textIndent: '60px',
        transition: 'all .3s ease-in-out',
        overflow: 'hidden',
        textOverflow: 'ellipsis ellipsis',
        '+ label': {
            textTransform: 'uppercase',
            display: 'inline-block',
        },
        '+ label + label': {
            opacity: '0',
            transition: 'opacity 2s',
        },
        '+ label, + label + label': {
            minHeight: '1.5em',
            width: '10em',
            overflow: 'hidden',
            textOverflow: 'ellipsis ellipsis',
            position: 'absolute',
            top: '8px',
            left: '0',
            bottom: '8px',
            padding: '5px 15px',
            color: '#032429',
            fontSize: '11px',
            fontWeight: '700',
            textShadow: '0 1px 0 rgba(19,74,70,0)',
            transition: 'all .3s ease-in-out',
            borderRadius: '3px',
            background: 'rgba(122,184,147,0)',
            '&:after': {
                position: 'absolute',
                content: '""',
                width: '0',
                height: '0',
                top: '100%',
                left: '150%',
                marginLeft: '-3px',
                borderLeft: '3px solid transparent',
                borderRight: '3px solid transparent',
                borderTop: '3px solid rgba(122,184,147,0)',
                transition: 'all .3s ease-in-out',
            },
        },
    },
    'input:focus, input:active, select:focus, select:active': {
        color: '#377D6A',
        textIndent: '0',
        background: '#FFF',
        '+ label': {
            width: '100%',
            overflow: 'visible',
            color: '#FFF',
            textShadow: '0 1px o rgba(19, 74, 70, .4)',
            background: 'rgba(122, 184, 147, 1)',
            transform: 'translateY(-1.9rem)',
        },
        '+ label + label': {
            height: '100%',
            opacity: '1',
            display: 'block',
            width: '100%',
            overflow: 'visible',
            color: '#FFF',
            textShadow: '0 1px o rgba(19, 74, 70, .4)',
            background: '$danger',
            transform: 'translateY(+1.9rem)',
        },
    },
    variants: {
        historic: {
            true: {
                'input, select': {
                    width: '10em',
                    '+ label': {
                        width: '6em',
                    },
                },
            },
        },
        error: {
            true: {
                'input, select': {
                    color: '$tenth',
                    background: '$danger',
                },
                'input:focus, input:active, select:focus, select:active': {
                    '+ label + label': {
                        height: '4rem',
                        background: '$danger',
                        display: 'inline-block',
                        zIndex: '1',
                    },
                },
            },
            false: {
                'input:focus, input:active, select:focus, select:active': {
                    '+ label + label': {
                        display: 'none',
                    },
                },
            },
        },
    },
})