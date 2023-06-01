import { stitches } from "../global.styles"

const { styled } = stitches

export const Container = styled('div',{
    display: 'flex',
    height: '20em',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    variants: {
        align: {
            column: {
                display: 'inline-block',
            },
            line: {
                height: '5em',
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
    '.form__field': {
        '&: required,&:invalid': { boxShadow: 'none', },
    },
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

export const ContainerInput = styled('div',{
    fontSize: '.9rem',
    fontFamily: 'Segoe UI, sans-serif',
    margin: '1rem 0 0 0',
    width: '10rem',
    // maxWidth: '190px',
    // position: 'relative',
    padding: '.1rem',
    'select': {
        width: '100%',
        position: 'relative',
        bottom: '15px',
    },
    'input': {
        width: '100%',
        color: 'gray',
        fontSize: '100%',
        padding: '0.8em',
        outline: 'none',
        border: 'none',
        borderBottom: '2px solid #ccc',
        backgroundColor: 'transparent',
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
    '.label': {
        // fontSize: '100%',
        position: 'relative',
        top: '-10px',
        // padding: '0.8em',
        marginLeft: '0.5em',
        // pointerEvents: 'none',
        // transition: 'all 0.3s ease',
    },
    'input:focus ~ div': {
        transform: 'scaleX(1)',
    },
    ':is(input:focus, input:valid, input:placeholder-shown)~label': {
        // transform: 'translateY(-50%) scale(.9)',
        transform: 'translateY(-50%)',
        margin: '0em',
        padding: '0.4em',
    },
    ':is(input:focus, input:valid)': {
        transition: 'all 0.3s ease',
        borderBottom: '2px solid $one1',
    },
})

export const ContainerLabel = styled('label',{
    color: '#999',
    fontSize: '18px',
    fontWeight: 'normal',
    position: 'relative',
    pointerEvents: 'none',
    left: '5px',
    top: '10px',
    transition: '0.2s ease all',
})