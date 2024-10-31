import { useState } from 'react'
import AppCard from './components/Card'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
  border: solid;
  border-color: green;
`

const Header = styled.div`
    display: flex;
    background-image: url("./src/assets/happyman.jpg");
    border-radius: 30px;
    overflow: hidden;
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    color: white;
    height: 100px
`

const App = () => {
  const [count, setCount] = useState(0)
  const cardData = [
    {
      title: 'Seo',
      description: 'Programming of a full responsive web design.',
      price: 300,
    },
    {
      title: 'Ads',
      description: 'Programming of a full responsive web design.',
      price: 400,
    },
    {
      title: 'Web',
      description: 'Programming of a full responsive web design.',
      price: 500,
    }
  ]

  return (
    <>
      <Header>Get the best price</Header>
        <Container>
          {cardData.map((element, index) => {
            return(
            <AppCard key={index} 
            title={element.title} description={element.description} price={element.price} index={index}>
            </AppCard>
            )
          })}
        </Container>
    </>
  )
}

export default App
