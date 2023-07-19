import { createStitches } from "@stitches/react";

export const stitches = createStitches({
    media: {
        bp1: "(min-width: 320px)",
        bp2: "(min-width: 768px)",
        bp3: "(min-width: 1200px)",
        bp4: "(max-width: 900px)",
    },
    theme: {
        colors: {
            first: '#00241B',
            second: '#2F3E46',
            third: '#354F52',
            fourth: '#52796F',
            fifth: '#84A98C',
            sixth: '#65B891',
            seventh: '#93E5AB',
            eighth: '#B5FFE1',
            ninth: '#CAD2C5',
            tenth: '#FFFFFF',
            eleventh: '#B6B6B6',
            twelfth: '#6C757D',
            thirteenth: '#3A587B',
            fourteenth: '#34495E',
            fifteenth: '#454545',
            sixteenth: '#363636',
            seventeenth: '#0E0C0C',
            
            tsuccess: '#124010',
            tinfo: '#3498DB',
            twarning: '#E9BD0C',
            tdanger: '#E24D4C',
            primary: '#57A0E5',
            secondary: '#6C757D',
            success: '#06532F',
            warning: '#CEBA33',
            danger: '#B63E3E',
            
            head: '#E2E3E5',
            title: '#36304A',
            odd: '#F2F2F2',
            even: '#FFFFFF',
            selected: '#ECECEC',
            line: '#CED4DA',
            button: '#6C757D',
            blueButton: '#0D6EFD',
        },
        space: {
            first: '1px',
            second: '2px',
            third: '3px',
            fourth: '4px',
            fifth: '5px',
            sixth: '6px',
            seventh: '7px',
            eighth: '8px',
            ninth: '9px',
            one2: '10px',
            twentyFifthH: '25vh',
            hundredthH: '100vh',
            hundredthW: '100vw',

            side: "256px",
            radios: "5px",

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

            xxs0: "0.422rem",
            xs0: "0.563rem",
            sm0: "0.75rem",
            rg0: "10%",
            md0: "1.33rem",
            lg0: "1.77rem",
            xl0: "2.369rem",

            step: "100px",
            cinco: "5px",
            px0: "0px",
        },
        fonts: {},
        fontSizes: {
            xxs: "0.422rem",
            xs: "0.700rem",
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
    //     bg: "$thirteenth",
    //     fg: "$fourteenth",
    // }
});

export const funkyTheme = stitches.createTheme({
    colors: {
        // bg: "$first",
        // fg: "$seventh",
    }
});