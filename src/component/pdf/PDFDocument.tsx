import { Page, Text, View, Image, Link, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../../assets/image/marinha.png'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        marginTop: 30,
        fontSize: 30,
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: '#228b22',
    },
    image: {
        width: 40,
        height: 40,
    },
    link: {
        color: '#333333',
        textDecoration: 'none'
    }
});

export const PDFDocument = (object: any) => {
    return (
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View>
                        <Image src={logo} style={styles.image} />
                    </View>
                    <Link src='https://www.makeuseof.com/react-create-pdf-documents/' style={styles.link}>Click Me</Link>
                    <View>
                        <Link src='https://react-pdf.org' style={styles.link}>Documentation</Link>
                    </View>
                    <View style={styles.section}>
                        <Text>Section #1</Text>
                    </View>
                </Page>
                <Page style={styles.page}>
                    <Text style={styles.text}>Hello There: {JSON.stringify(object.object.id)}</Text>
                    <View style={styles.section}>
                        <Text>Section #2</Text>
                    </View>
                </Page>
            </Document>
        </>
    )
}