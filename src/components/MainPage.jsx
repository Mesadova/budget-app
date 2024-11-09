import { GlobalStyle, Container, Header } from "../App"
import styled from "styled-components"
import { Link } from 'react-router-dom'

export const ButtonWelcome = styled.button`
    border: solid;
    border-color: white;
    cursor: pointer;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    border-radius: 10px;
    background: rgb(255,245,34);
    background: linear-gradient(0deg, rgba(255,245,34,1) 0%, rgba(253,45,45,1) 100%);
    padding: 13px;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    color: black;
    font-family: 'Poppins';
`

export const MainPageHeader = styled.div`
    width: 50%;
    border-radius: 20px;
    height: 200px;
    margin-top: 30px;
    font-size: 30px;
    text-align: center;
    align-content: center;
    color: white;
    font-weight: bold;
    box-shadow:
      inset 0 0 50px #fff,      /* inner white */
      inset 20px 0 80px #f0f,   /* inner left magenta short */
      inset -20px 0 80px #0ff,  /* inner right cyan short */
      inset 20px 0 300px #f0f,  /* inner left magenta broad */
      inset -20px 0 300px #0ff, /* inner right cyan broad */
      0 0 50px #fff,            /* outer white */
      -10px 0 80px #f0f,        /* outer left magenta */
      10px 0 80px #0ff;         /* outer right cyan */
`

const MainPage = () => {
    return(
        <Container>
            <GlobalStyle></GlobalStyle>
            <MainPageHeader>Make yourself visible over the internet</MainPageHeader>
            <Link to="home"><ButtonWelcome>Get your tailor-made plan</ButtonWelcome></Link>
        </Container>
    )
}

export default MainPage