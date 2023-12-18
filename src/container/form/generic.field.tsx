import { stitches } from "../global.styles"

const { styled } = stitches

export const Container = styled('div', {
    overflow: 'auto',
    display: 'flex',
    minHeight: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '$lg',
    '.tab': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    variants: {
        align: {
            column: {
                display: 'inline-block',
            },
            line: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            inputs: {
                height: '13.5rem',
            },
            response: {
                height: '5rem',
            },
        },
    },
})

export const ContainerInput2 = styled('span', {
    position: 'relative',
    display: 'inline-block',
    margin: 'min(.2em) min(.2em) 0em 0em',
    overflowX: 'clip',
    ':has(label)': {
        outline: '2px solid blue',
    },
    'input[type=checkbox]': {
        '+ label, + label + label': {
            height: '1.4em',
        },
    },
    'input': {
        textIndent: '50%',
    },
    'select': {
        textIndent: '15%',
        minHeight: '1.8em',
    },
    'input:disabled': {
        backgroundColor: '$eleventh',
        cursor: 'not-allowed',
    },
    'input, select': {
        display: 'inline-block',
        width: '20em',
        margin: '.25rem',
        padding: '10px 0 10px 35px',
        color: '$fourth',
        background: '$tenth',
        border: '0',
        borderRadius: '.25rem',
        outline: '0',
        transition: 'all .3s ease-in-out',
        textOverflow: 'ellipsis ellipsis',
        '+ label': {
            pointerEvents: 'none',
            textTransform: 'uppercase',
            display: 'inline-block',
        },
        '+ label + label': {
            display: 'none',
            filter: 'opacity(0)',
        },
        '+ label, + label + label': {
            overflow: 'hidden',
            textOverflow: 'ellipsis ellipsis',
            position: 'absolute',
            top: '.9rem',
            left: '0',
            bottom: '.7rem',
            padding: '.1em 1.5em',
            color: '#032429',
            fontSize: '$sm',
            textShadow: '0 1px 0 rgba(19,74,70,0)',
            transition: 'all .3s ease-in-out',
            borderRadius: '.25rem',
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
    'input:not([disabled]):focus, input:not([disabled]):active, input:not([disabled]):hover, select:not([disabled]):focus, select:not([disabled]):active, select:not([disabled]):hover': {
        color: '$fourth',
        textIndent: '0',
        background: '$tenth',
        '+ label': {
            width: '90%',
            margin: '0 5%',
            overflow: 'visible',
            color: '$tenth',
            textShadow: '0 1px o rgba(19, 74, 70, .4)',
            background: 'rgba(122, 184, 147, 1)',
            transform: 'translateY(-1.2rem)',
        },
        '+label+label': {
            width: '90%',
            margin: '0 5%',
            marginTop: '.3rem',
            padding: '.5rem',
            filter: 'opacity(1)',
            color: '$tenth',
            textShadow: '0 1px o rgba(19, 74, 70, .4)',
            background: '$fifteenth',
            transform: 'translateY(+1.1rem)',
        },
    },
    variants: {
        historic: {
            true: {
                'input, select': {
                    width: '10em',
                    '+ label': {
                        width: '8em',
                    },
                },
            },
            false: {
                'input, select': {
                    '+ label': {
                        width: '7rem',
                    },
                },
            },
        },
        error: {
            true: {
                'input, select': {
                    color: '$tenth',
                    background: '$fifteenth',
                },
                'input:focus, input:active, input:hover, select:focus, select:active, select:hover': {
                    '+ label + label': {
                        height: '4rem',
                        background: '$fifteenth',
                        display: 'inline-block',
                        zIndex: '1',
                    },
                },
            },
        },
    },
})

export const ContainerInput = styled('div', {
    fontSize: '.9rem',
    fontFamily: 'Segoe UI, sans-serif',
    margin: '1rem 0 0 0',
    padding: '.2rem',
    'input': {
        fontSize: '100%',
        padding: '0.7rem',
        outline: 'none',
        border: 'none',
        borderRadius: '.3rem',
        backgroundColor: '$sixth',
        width: '100%',
    },
    'input[type="number"]': {
        appearance: 'textfield',
    },
    'label': {
        fontSize: '100%',
        position: 'absolute',
        left: '0',
        padding: '0.8em',
        marginLeft: '0.5em',
        pointerEvents: 'none',
        transition: 'all 0.3s ease',
    },
    'input:focus ~ div': {
        transform: 'scaleX(1)',
    },
    ':is(input:focus, input:valid)~label': {
        color: '$sixth',
        transform: 'translateY(-85%) scale(.9)',
        margin: '0em',
        padding: '0.4em',
    },
    ':is(input:focus, input:valid)': {
        transition: 'all 0.3s ease',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    },
})

export const ContainerLabel = styled('label', {
    color: '#999',
    fontSize: '18px',
    fontWeight: 'normal',
    position: 'relative',
    pointerEvents: 'none',
    left: '5px',
    top: '10px',
    transition: '0.2s ease all',
})

export const InputGroup = styled('span', {
    padding: '.2rem',
    display: 'flex',
    alignItems: 'center',
    'span': {
        position: 'relative',
        display: 'inline-block',
        borderBottom: '1px dotted black',
    },
    'span .tooltiptext': {
        visibility: 'hidden',
        width: '120px',
        backgroundColor: 'black',
        color: '#fff',
        fontSize: '.75rem',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '5px 0',
        position: 'absolute',
        zIndex: '1',
        top: '150%',
        left: '50%',
        marginLeft: '-60px',
    },
    '.tooltiptext::after': {
        content: "",
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        marginLeft: '-5px',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent black transparent',
    },
    'span:hover .tooltiptext': {
        visibility: 'visible',
    },
    'input:first-child': {
        borderTopLeftRadius: '.3rem',
        borderBottomLeftRadius: '.3rem',
    },
    'span > input': {
        color: 'green',
    },
    'input:not(:last-of-type)': {
        borderRight: 'none',
    },
    'input:last-of-type': {
        borderTopRightRadius: '.3rem',
        borderBottomRightRadius: '.3rem',
    },
    input: {
        height: '2.2rem',
        width: '4rem',
        padding: '0 1rem',
        color: '#354F52',
        fontSize: '15px',
        border: '1px solid #354F52',
        backgroundColor: '$sixth',
    },
    '.label': {
        pointerEvents: 'none',
        // cursor: 'not-allowed',
        padding: '.5em 1em',
        border: 'none',
        backgroundColor: '#354F52',
        color: '#fff',
        fontSize: '15px',
        transition: 'background-color .3s ease-in-out',
    },
    'input:focus, input:focus-visible': {
        borderColor: '#84A98C',
        outline: 'none',
    },
    variants: {
        error: {
            true: {
                'input, select': {
                    color: '$tenth',
                    background: '$fifteenth',
                },
                'input:focus, input:active, input:hover, select:focus, select:active, select:hover': {
                    '+ label + label': {
                        height: '4rem',
                        // background: '$fifteenth',
                        display: 'inline-block',
                        zIndex: '1',
                    },
                },
            },
        },
    },
})