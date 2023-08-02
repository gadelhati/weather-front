import { stitches } from '../global.styles'

const { styled } = stitches

// ref.: https://bholmes.dev/blog/a-shiny-on-hover-effect-that-follows-your-mouse-css/
// ref.: https://cdpn.io/agrimsrud/fullpage/RwKbwXN?anon=true&view=

export const ShineButton = styled('div',{
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100vh',
    color: 'white',
    position: 'relative',
    border: 'none',
    padding: '10px 15px',
    background: '#3984ff',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    overflow: 'hidden',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 'calc(var(--y, 0) * 1px - 50px)',
        left: 'calc(var(--x, 0) * 1px - 50px)',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(white, #3984ff00 80%)',
        opacity: '0',
        transition: 'opacity 0.2s',
    },
    ':hover::after': {
        opacity: '0.4',
    },
})