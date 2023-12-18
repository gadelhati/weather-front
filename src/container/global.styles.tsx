import { createStitches } from "@stitches/react";

export const stitches = createStitches({
    media: {
        bp1: "(max-width: 320px)",
        bp2: "(max-width: 820px)",
        bp3: "(max-width: 1200px)",
        bp4: "(max-width: 900px)",
    },
    theme: {
        colors: {
            first: '#00241B',
            second: '#2F3E46',
            third: '#354F52',
            fourth: '#52796F',
            fifth: '#84A98C',
            sixth: '#F2F2F2',
            seventh: '#ECECEC',
            eighth: '#CED4DA',
            ninth: '#CAD2C5',
            tenth: '#FFFFFF',
            eleventh: '#B6B6B6',
            twelfth: '#6C757D',
            thirteenth: '#06532F',
            fourteenth: '#124010',
            fifteenth: '#E24D4C',
            sixteenth: '#363636',
            seventeenth: '#A30000',
            eighteenth: '#FFBF00',
            nineteenth: '#DAA520',
            // #D1D100
            twentieth: '#0D6EFD',
            twentyFirst: '#3498DB',
            twentySecond: '#268e84',
            twentyThird: '#54b687',
            twentyFifth:'#68a3be',
            twentySixth:'#354f52',

            one: '#73E86D',
            two: '#000000',
            three: '#A8C3E7',
            four: '#E5E052',
            five: '#C12525',
            six: '#FFFFFF',
        },
        space: {
            xxxs: "0.06rem",
            xxs: "0.222rem",
            xs: "0.563rem",
            sm: "0.75rem",
            rg: "1rem",
            md: "1.33rem",
            lg: "1.77rem",
            xl: "2.369rem",
            xxl: "2.7rem",
            xxxl: "10rem",
        },
        fonts: {},
        fontSizes: {
            xxs: "0.422rem",
            xs: "0.563rem",
            sm: "0.75rem",
            rg: "1rem",
            md: "1.33rem",
            lg: "1.77rem",
            xl: "2.369rem",
            xxl: "3.157rem",
            radius: ".25rem",
        },
    },
})

const injectGlobalStyles = stitches.globalCss({
    // "*": { boxSizing: "border-box", fontFamily: "inherit", flexShrink: 0 },
    "*": { boxSizing: "border-box", fontFamily: "Montserrat, sans-serif", flexShrink: 0 },
    "*:after": { boxSizing: "border-box", fontFamily: "inherit" },
    "*:before": { boxSizing: "border-box", fontFamily: "inherit" },
    body: { margin: 0, padding: 0, minHeight: '100vh' },
    h1: { margin: 0 },
    html: { height: '-webkit-fill-available' },
    main: {
        display: 'flex',
        flexWrap: 'nowrap',
        height: '100vh',
        maxHeight: '100vh',
        overflowX: 'auto',
        overflowY: 'hidden',
    }
})

injectGlobalStyles()

export const darkTheme = stitches.createTheme({
    // colors: {
    //     bg: "$darkJungleGreen",
    //     fg: "$fluorescentBlue",
    // }
});

export const funkyTheme = stitches.createTheme({
    colors: {
        // bg: "$darkKhaki",
        // fg: "$darkSlateBlue",
    }
});