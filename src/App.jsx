import { useEffect, useState } from 'react'
import AppCard from './components/Card'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid;
  border-color: green;
  gap: 30px;
`

const Header = styled.div`
  display: flex;
  width: 70%;
  height: 12rem;
  background-image: url("./src/assets/header.jpg");
  border-radius: 30px;
  border: solid;
  border-color: black;
  border-width: 1px;
  overflow: hidden;
  font-family: Poppins;
  font-size: 30px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  color: black;
`

const Budget = styled.div`
  margin-left: 35%;
  font-family: Poppins;
  font-size: 30px;
  font-weight: bold;
`

const App = () => {
  const [total, setTotal] = useState(0)
  const [budgetPlans, setBudgetPlans] = useState([])

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

  const calcTotal = () => {
    const sum = budgetPlans.reduce((accumulator, currentValue) => 
        accumulator + currentValue.planPrice + ((currentValue.planLangs + currentValue.planPages)*30), 0
    )
    console.log('calc total', sum)
    setTotal(sum)
}

  

  return (
    <>
      
        <Container>
          <Header>Get the best quality</Header>
          {cardData.map((element, index) => {
            return(
            <AppCard key={index} 
            title={element.title} description={element.description} setTotal={setTotal} total={total}
            price={element.price} index={index} budgetPlans={budgetPlans} setBudgetPlans={setBudgetPlans}
            calcTotal={calcTotal}>
            </AppCard>
            )
          })}
          <Budget>
            <p>Budget price: {total}€</p>
          </Budget>
        </Container>
    </>
  )
}

export default App
