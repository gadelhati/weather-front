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
    borderRadius: '.3rem',
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
    width: '256px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '$xxs',
    margin: '$xxs',
    borderRadius: '.3rem',
    backgroundColor: '$third',
    backgroundImage: 'linear-gradient(to bottom, $fourth, $third)',
    boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .1rem #AAA inset',
    // scrollBehavior: 'smooth',
    // overflowY: 'auto',
    // overflowX: 'hidden',
    zIndex: 1,
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
    // backgroundColor: '$fourth',
    // borderRadius: '0.3em',
})

export const SidebarContainerCollapsible = styled('div',{
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: '.3rem',
    'a': {
        
    },
    // boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .25rem #AAA inset',
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
            },
            false: {
                // backgroundColor: '$ninth',
                'a:first-child': {
                    display: 'block',
                },
                'a': {
                    display: 'none',
                },
            },
        },
    },
})

export const SidebarContainerButton = styled('div',{
    textDecoration: 'none',
    textAlign: 'center',
    color: '$second',
    // boxShadow: '5px 5px 5px',
    height: '30px',
    width: '30px',
    userSelect: 'none',
    borderRadius: '50%',
    marginTop: '10px',
    marginRight: '-14px',
    transition: '.5s',
    p : {
        display: 'flex',
    },
    '&:hover': {
        color: '$tenth',
        // color: '#85919e',
    },

})

export const SidebarContainerButtonH = styled('div', {
    borderRadius: '.3rem',
    display: 'flex',
    alignContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '0px',
    transition: '.5s',
    cursor: 'pointer',
})

export const SideContainerFolderIcon = styled('div',{
    borderRadius: '.3rem',
    display: 'flex',
    margin: '',
    alignItems: 'center',
    alignContent: 'flex-start',
    // marginTop: '-23px',
    marginLeft: '190px',
    transition: '.5s',
    cursor: 'pointer',
})

export const SideContainerTitle = styled('a',{
    textDecoration: 'none',
    color: '$ninth',
    // colocar talvez cor de fundo $fourth? não mesquecer.
    // backgroundColor: '$tenth',
    height: '$md',
    width: '$xss',
    userSelect: 'none',
    borderRadius: '.3rem',
    padding: '$xs',
    margin: '$xxxs',
    textTransform: 'capitalize',
    transition: '.5s',
    p : {
        display: 'inline',
    },
    '&:hover': {
        color: '$second',
        backgroundColor: '$ninth',
        boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .25rem #AAA inset',
    },
    // boxShadow: '0 .3rem .6rem rgba(0,0,0,0.16), 0 .3rem .6rem rgba(0,0,0,0.23), 0 0 .25rem #AAA inset',
})

export const SideContainerItem = styled('a',{
    textDecoration: 'none',
    color: '$ninth',
    height: '$xss',
    width: '$xss',
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
                backgroundColor: '$ninth'
            },
            content: {
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