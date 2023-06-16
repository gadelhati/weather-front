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
    paddingTop: '$lg',
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
        minHeight: '1.5em',
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
            width: '10em',
            overflow: 'hidden',
            textOverflow: 'ellipsis ellipsis',
            display: 'inline-block',
            position: 'absolute',
            top: '8px',
            left: '0',
            bottom: '8px',
            padding: '5px 15px',
            color: '#032429',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
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
            transform: 'translateY(-30px)',
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
    },
})

export const ContainerInput2 = styled('div', {
    $primary: '#11998e',
    $secondary: '#38ef7d',
    $white: '#fff',
    $gray: '#9b9b9b',
    '.form__group': {
        position: 'relative',
        padding: '15px 0 0',
        marginTop: '10px',
        width: '50 %',
    },
    '.form__field': {
        fontFamily: 'inherit',
        width: '100 %',
        border: '0',
        borderBottom: '2px solid $gray',
        outline: '0',
        fontSize: '1.3rem',
        color: '$white',
        padding: '7px 0',
        background: 'transparent',
        transition: 'border - color 0.2s',
        '&::placeholder': {
            color: 'transparent',
        },
        '&: placeholder - shown ~ .form__label': {
            fontSize: '1.3rem',
            cursor: 'text',
            top: '20px',
        },
    },
    '.form__label': {
        position: 'absolute',
        top: '0',
        display: 'block',
        transition: '0.2s',
        fontSize: '1rem',
        color: '$gray',
    },

    '.form__field:focus': {
        '~ .form__label': {
            position: 'absolute',
            top: '0',
            display: 'block',
            transition: '0.2s',
            fontSize: '1rem',
            color: '$primary',
            fontWeight: '700',
        },
        paddingBottom: '6px',
        fontWeight: '700',
        borderWidth: '3px',
        borderImage: 'linear - gradient(to right, $primary, $secondary)',
        borderImageSlice: '1',
    },
    /* reset input */
    // '.form__field': {
    //     '&: required,&:invalid': { boxShadow: 'none', },
    // },
    /* demo */
    'body': {
        // fontFamily: 'Poppins', sans - serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        backgroundColor: '#222222',
    }
})

export const ContainerInput3 = styled('div', {
    position: 'relative',
    margin: '20px',
    'input': {
        display: 'block',
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        borderBottom: '2px solid #ccc',
        outline: 'none',
        backgroundColor: 'transparent',
    },
    'label': {
        position: 'absolute',
        top: '0',
        left: '0',
        fontSize: '16px',
        color: 'rgba(204, 204, 204, 0)',
        pointerEvents: 'none',
        transition: 'all 0.3s ease',
    },
    'span': {
        position: 'absolute',
        bottom: '0',
        left: '0',
        height: '2px',
        width: '0',
        backgroundColor: '#007bff',
        transition: 'all 0.3s ease',
    },
    'input:focus + label': {
        top: '-20px',
        fontSize: '12px',
        color: '#007bff',
    },
    'input:focus + label + span': {
        width: '100%',
    },
})

export const ContainerInput4 = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    'input': {
        position: 'relative',
        maxWidth: '190px',
        border: 'none',
        boxShadow: '0px 1.5px 0px 0px #858585',
        padding: '.5rem',
        transition: 'all 200ms ease-in-out',
        opacity: '.8',
    },
    'label': {
        fontSize: '.625rem',
        fontWeight: 'bold',
        color: '#858585',
        marginBottom: '4px',
        marginLeft: '1px',
    },
    'span': {
        color: '#858585',
        fontSize: '.5rem',
        marginTop: '6px',
        marginLeft: '1px',
        visibility: 'hidden',
        transform: 'translateY(-.5rem)',
        transition: 'all 100ms linear',
        zIndex: '-1',
    },
    'input::placeholder': {
        color: 'rgb(145, 145, 145)',
        fontSize: '.75rem',
    },
    'input::after': {
        content: 'attr(placeholder)',
        position: 'absolute',
        color: '#161616',
        top: '0',
        left: '0',
    },
    'input:focus': {
        border: 'none',
        boxShadow: '0px 1.5px 0px 0px #72E985',
        outline: 'none',
    },
    'input:focus + span': {
        visibility: 'visible',
        transform: 'translateY(0rem)',
    },
    'input:focus::placeholder': {
        visibility: 'hidden',
    },
})

export const ContainerInput5 = styled('div', {
    'label': {
        display: 'block',
        color: 'white',
        fontSize: '14px',
        padding: '5px 5px',
    },
    'input': {
        display: 'block',
        width: '200px',
        height: '40px',
        backgroundColor: '#292929',
        borderRadius: '30px',
        border: '2px solid #292929',
        padding: '0px 12px',
        outline: 'none',
        caretColor: 'rgb(152, 88, 255)',
        color: 'rgb(212, 212, 212)',
        fontSize: '12px',
        transitionDuration: '.2s',
    },
    'label:focus, label:valid': {
        border: '2px solid rgb(152, 88, 255)',
        transitionDuration: '.2s',
    },
})

export const ContainerInput6 = styled('div', {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    'input': {
        border: '2px solid white',
        backgroundColor: 'transparent',
        borderRadius: '10px',
        padding: '12px 15px',
        color: 'black',
        fontWeight: '500',
        outline: 'none',
        caretColor: 'rgb(155, 78, 255)',
        transitionDuration: '.3s',
        fontFamily: 'Whitney, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    },
    'label': {
        position: 'absolute',
        top: '-25px',
        left: '5px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '400',
        fontFamily: 'Whitney, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        overflow: 'hidden',
        transition: '.2s linear',
        opacity: '0',
    },
    'input:focus ~ label, input:valid ~ label': {
        transform: 'translateX(20px)',
        opacity: '1',
    },
    // 'input:focus, input:valid': {
    //     transform: 'translateX(20px)',
    //     opacity: '1',
    //     backgroundColor: '#ddd',
    //     transitionDuration: '.3s',
    // },
})