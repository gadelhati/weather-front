import { stitches } from "../global.styles"

const { styled } = stitches

export const FlexCointainer = styled('div',{
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    // alignItems: 'center',
    overflow: 'hidden',
    variants: {
        element:{
            all: {
                alignItems: 'stretch',
                backgroundColor: '$back',
            },
            main: {
                flexBasis: '0',
                flexGrow: '1.5',
                flexDirection: "column",
                color: '$four1',
                backgroundColor: '$three1'
            },
            content: {
                height: '94vh',
                flexDirection: "row",
                
                color: '$three1',
                backgroundColor: '$four1'
            },
            nav: {
                height: '6vh',
                backgroundPosition: '50%',
                padding: '.5rem',
                flexDirection: "row",
                justifyContent: 'space-between',
                
                color: '$two1',
                backgroundColor: '$five1'
            },
        },
    },
})
export const SideTitle = styled('a',{
    textDecoration: 'none',
    color: '$three1',
    backgroundColor: '$five1',
    height: '$md',
    width: '$xss',
    userSelect: 'none',
    borderRadius: '5px',
    padding: '.5em',
    textTransform: 'capitalize',
    transition: '.5s',
    p : {
        display: 'inline',
    },
})
export const SideItem = styled('a',{
    textDecoration: 'none',
    color: '$five1',
    height: '$xss',
    width: '$xss',
    userSelect: 'none',
    borderRadius: '5px',
    padding: '.5em',
    textTransform: 'capitalize',
    transition: '.5s',
    '&:hover': {
        color: '$five1',
        backgroundColor: '$three1',
        boxShadow: '0 0 0.2em #000, 0 0 0.2em #999, 0 0 0.2em #888',
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

export const Sidebar = styled('aside',{
    width: '256px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '$xxs',
    // paddingLeft: '$xxs',
    margin: '$xxs',
    borderRadius: '.3rem',
    color: '$five1',
    backgroundColor: '$one1',
    backgroundImage: 'linear-gradient(to bottom, $one1, $three1)',
    // scrollBehavior: 'smooth',
    // overflowY: 'auto',
    // overflowX: 'hidden',
    '&:hover' : {
        // textShadow: '0 0 0.2em #000, 0 0 0.2em #000, 0 0 0.2em #000',
    },
    variants: {
        sidehide: {
            true: {
                // '@bp4': {
                //     display: 'none',
                // },
            },
            false: {
                width: '2.9rem',
                'p': {
                    display: 'none',
                },
                // '@bp4': {
                //     display: 'none',
                // },
            },
        },
    },
})
export const SidebarHeader = styled('div',{
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '.3rem',
    color: '$five1',
})
export const CenterContainer = styled('div',{
    backgroundColor: '$one1',
    backgroundImage: 'linear-gradient(to bottom, $one1, $three1)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})
export const CenterItem = styled('div', {
    // backgroundColor: '$four1',
    borderRadius: '10px',
    minWidth: '25vw',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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