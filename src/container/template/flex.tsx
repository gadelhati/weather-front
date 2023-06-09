import { stitches } from "../global.styles"

const { styled } = stitches

export const CenteredContainer = styled('div',{
    color: '$ninth',
    backgroundColor: '$third',
    backgroundImage: 'linear-gradient(to bottom, $third, $fourth)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

export const CenteredContainerItem = styled('div', {
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '$xl',
    padding: '$rg',
    variants: {
        direction: {
            row: {
                padding: '0',
                flexDirection: 'row',
            },
        },
    },
})

export const SidebarContainer = styled('aside',{
    fontFamily: 'Montserrat, sans-serif',
    width: '256px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '$xxs',
    margin: '$xxs',
    borderRadius: '5px',
    backgroundColor: '$third',
    backgroundImage: 'linear-gradient(to bottom, $fourth, $third)',
    // scrollBehavior: 'smooth',
    // overflowY: 'auto',
    // overflowX: 'hidden',
    variants: {
        sidehide: {
            false: {
                width: '2.7rem',
                'p': {
                    display: 'none',
                },
            },
        },
    },
})

export const SidebarContainerHeader = styled('div',{
    display: 'flex',
    flexDirection: 'column',
    color: '$ninth',
})

export const SidebarContainerCollapsible = styled('div',{
    fontFamily: 'Montserrat, sans-serif',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: '5px',
    'a': {
        backgroundColor: '$fourth',
    },
    variants: {
        collapsible: {
            true: {
                backgroundColor: '$ninth',
                'a:first-child': {
                    color: '$second',
                    backgroundColor: '$ninth',
                    display: 'block',
                },
                'a': {
                    color: '$ninth',
                    backgroundColor: '$fourth',
                },
            },
            false: {
                backgroundColor: '$ninth',
                'a:first-child': {
                    display: 'block',
                    // backgroundColor: 'none',
                },
                'a': {
                    display: 'none',
                },
            },
        },
    },
})

export const SideContainerTitle = styled('a',{
    textDecoration: 'none',
    color: '$third',
    backgroundColor: '$tenth',
    height: '$md',
    width: '$xss',
    userSelect: 'none',
    borderRadius: '5px',
    padding: '$xs',
    margin: '$xxxs',
    textTransform: 'capitalize',
    transition: '.5s',
    p : {
        display: 'inline',
    },
})

export const SideContainerItem = styled('a',{
    textDecoration: 'none',
    color: '$ninth',
    height: '$xss',
    width: '$xss',
    userSelect: 'none',
    borderRadius: '5px',
    padding: '$xs',
    margin: '$xxxs',
    textTransform: 'capitalize',
    transition: '.3s',
    '&:hover': {
        color: '$second',
        backgroundColor: '$ninth',
        boxShadow: '0 0 0.2em #FFF, 0 0 0.2em #222, 0 0 0.2em #333',
    },
    '&:focus': {
        color: '$first',
        backgroundColor: '$tenth',
        boxShadow: '0 0 0.2em #FFF, 0 0 0.2em #222, 0 0 0.2em #333',
    },
    p : {
        display: 'inline',
    },
    variants: {
        element:{
            final: {
                alignSelf: 'stretch',
            },
        },
    },
})

export const FlexCointainer = styled('div',{
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    overflow: 'hidden',
    variants: {
        element:{
            all: {
                alignItems: 'stretch',
                backgroundColor: '$ninth',
            },
            main: {
                flexBasis: '0',
                flexGrow: '1.5',
                flexDirection: "column",
                color: '$fifth',
                backgroundColor: '$fourth'
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