import { stitches } from "../global.styles"

const { styled } = stitches

export const Container = styled('div',{
    display: 'flex',
    height: '20em',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    variants: {
        block: {
            true: {
                display: 'inline-block',
            },
            false: {
                height: '5em',
            },
        },
    },
})

export const ContainerInput = styled('div',{
    fontSize: '.9rem',
    fontFamily: 'Segoe UI, sans-serif',
    margin: '1rem 0 0 0',
    // maxWidth: '190px',
    // position: 'relative',
    padding: '.1rem',
    'input': {
        color: '$five1',
        fontSize: '100%',
        padding: '0.8em',
        outline: 'none',
        border: 'none',
        borderBottom: '2px solid #ccc',
        backgroundColor: 'transparent',
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