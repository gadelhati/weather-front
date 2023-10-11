import logo from '../../assets/image/marinha.png'
import { styled } from '@stitches/react';

const HomepageDiv = styled('div', {
    paddingTop: '5rem',
    width: '100vw',
    position: 'absolute',
    left: 0
});

const HomepageImg = styled('img', {
    opacity: '40%',
    maxHeight: '600px',
    maxWidth: '600px',
    // marginLeft: '150px',
    marginTop: '-72px',
    // margin: 'auto',
    // justifyContent: 'right',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignContent: 'center',

})

export const HomepageAugusto = () => {
    return <HomepageDiv><HomepageImg src={logo}  alt="logoMarinha" /></HomepageDiv>
}


  

