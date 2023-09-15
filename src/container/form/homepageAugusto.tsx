import logo from '../../assets/image/marinha.png'
import { styled } from '@stitches/react';

const HomepageDiv = styled('div', {
    width: '100vw',
    position: 'absolute',
    left: 0
});

const HomepageImg = styled('img', {
    opacity: '40%',
    maxHeight: '600px',
    maxWidth: '600px',
    // marginLeft: '150px',
    marginTop: '05px',
    // margin: 'auto',
    // justifyContent: 'right',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',

})

export const HomepageAugusto = () => {
    return <HomepageDiv><HomepageImg src={logo}  alt="logoMarinha" /></HomepageDiv>
}


  

