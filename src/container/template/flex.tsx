import { stitches } from "../global.styles"
import logo from '../../assets/image/marinha.png'

const { styled } = stitches

export const FlexCointainer = styled('div', {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    overflow: 'hidden',
    backgroundImage: `url("https://cdn-defesaaereanaval.nuneshost.com/wp-content/uploads/2021/05/Marinha-do-brasil-Logo.jpg")`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundBlendMode: 'soft-light',
    variants: {
        element: {
            all: {
                alignItems: 'stretch',
                backgroundColor: '$ninth',
            },
            main: {
                flexBasis: '0',
                flexGrow: '1.5',
                flexDirection: "column",
                color: '$fifth',
                backgroundColor: '$ninth'
            },
            content: {
                height: '94vh',
                flexDirection: "row",

                color: '$fourth',
                backgroundColor: '$fifth'
            },
            nav: {
                height: '6vh',
                backgroundPosition: '50%',
                padding: '.5rem',
                flexDirection: "row",
                justifyContent: 'space-between',

                color: '$third',
                backgroundColor: '$ninth'
            },
        },
    },
})
export const SideTitle = styled('a', {
    textDecoration: 'none',
    color: '$ninth',
    height: '2.2rem',
    userSelect: 'none',
    borderRadius: '.3rem',
    padding: '$xs',
    margin: '$xxxs',
    textTransform: 'capitalize',
    transition: '.5s',
    p: {
        display: 'inline',
    },
    'span:first-child': {
        display: 'none',
    },
    'svg': {
        transform: 'rotate(180deg)',
    },
    'img': {
        height: '1.2rem',
    },
    '&:hover': {
        color: '$second',
        backgroundColor: '$ninth',
        boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .25rem #AAA inset',
        'span:first-child': {
            display: 'flex',
        },
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    variants: {
        sidehide: {
            false: {
                'span:first-child': {
                    display: 'none',
                },
            },
            true: {
                'svg': {
                    transform: 'rotate(180deg)',
                },
            },
        },
    },
})
export const SideItem = styled('a', {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    'div': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textDecoration: 'none',
    color: '$ninth',
    height: '2.2rem',
    userSelect: 'none',
    borderRadius: '.3rem',
    padding: '$xs',
    margin: '$xxxs',
    textTransform: 'capitalize',
    transition: '.3s',
    '&:hover': {
        color: '$second',
        backgroundColor: '$ninth',
        boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .25rem #AAA inset',
    },
    '&:focus': {
        color: '$first',
        backgroundColor: '$tenth',
        boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .25rem #AAA inset',
    },
    p: {
        display: 'inline',
    },
    variants: {
        element: {
            final: {
                alignSelf: 'stretch',
            },
        },
    },
})

export const Sidebar = styled('aside', {
    width: '2.9rem',
    'a p': {
        display: 'none',
    },
    'a span': {
        display: 'none',
    },
    minHeight: '20rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '$xxs',
    margin: '$xxs',
    borderRadius: '.3rem',
    backgroundColor: '$third',
    backgroundImage: 'linear-gradient(to bottom, $fourth, $third)',
    boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .1rem #AAA inset',
    scrollBehavior: 'smooth',
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: 'width .2s',
    '&:hover': {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '256px',
        'a p, a span': {
            display: 'flex',
        },
    },
    '@bp1': {
        width: '2.9rem',
        'p': {
            display: 'none',
        },
    },
})
export const SidebarHeader = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    color: '$ninth',
})
export const CenterContainer = styled('div', {
    backgroundColor: '$second',
    backgroundImage: 'linear-gradient(to bottom, $second, $fourth)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})
export const CenterItem = styled('div', {
    color: '$fourteenth',
    padding: '5rem 0rem 5rem 0',
    borderRadius: '.3rem',
    width: '18rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    'img': {
        margin: '2em',
    },
    'span': {
        height: '1em',
    },
    'button': {
        margin: '2em',
    },
    variants: {
        direction: {
            column: {
                flexDirection: 'column',
            },
            row: {
                minHeight: '0',
                flexDirection: 'row',
                justifyContent: 'center',
            },
        },
    },
})

export const SidebarCollapsible = styled('div',{
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: '.3rem',
    'a:first-child': {
        display: 'flex',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
    },
    variants: {
        collapsible: {
            true: {
                backgroundColor: '$ninth',
                'a:first-child': {
                    color: '$second',
                    backgroundColor: '$ninth',
                    display: 'block',
                    boxShadow: 'none',
                },
                'a': {
                    color: '$ninth',
                    backgroundColor: '$fourth',
                },
                'svg:last-child': {
                    transform: 'rotate(270deg)',
                },
            },
            false: {
                'a:first-child': {
                    display: 'block',
                },
                'a': {
                    display: 'none',
                },
                'svg:last-child': {
                    transform: 'rotate(90deg)',
                },
            },
        },
    },
})