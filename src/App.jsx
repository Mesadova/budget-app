import { useState } from 'react'
import { Card, CardBody, CardTitle, CardText, Form, Button} from "react-bootstrap"
import AvailablePlans from './components/AvailablePlans'
import BudgetForm from './components/BudgetForm'
import { styled, createGlobalStyle  } from 'styled-components'
import PersonalizePlans from './components/PersonalizePlans'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins';
    background-color: black;
  }
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid;
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
  font-size: 30px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  color: black;
`

const Budget = styled.div`
  margin-left: 35%;
  font-size: 30px;
  font-weight: bold;
`

export const CardContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    gap: 30px;
    margin-bottom: 14px;
    &.parameters {
        align-items: flex-end;
        justify-content: flex-end;
        align-content: flex-end;
        flex-direction: column;
        margin-bottom: 0px;
    }
    &.budgetForm {
        align-items: flex-start;
        justify-content: flex-start;
        align-content: flex-start;
        flex-direction: column;
    }
    &.personalizedPlan {
      justify-content: space-between;
    }
`

export const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    min-width: 50%;
    padding: 20px;
    box-shadow: -0px 5px 5px 5px grey;
    border-radius: 30px;
    overflow: hidden;
    background-color: white;
    align-content: center;
    &.budgetForm {
      margin-bottom: 160px;
      &:after {
        content: "";
        position: absolute;
        top: 153%;
        left: 0;
        right: 0;
        height: 0.5em;
        border-top: 5px dashed gray;
        border-radius: 280px;
        z-index: -1;
      }
    }
`

export const StyledCardBody = styled(CardBody)`
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    align-content: center;
    &.header {
        align-items: flex-start;
        flex-direction: column;
    }
    &.budgetForm {
        gap: 20px;
        margin-bottom: 20px;
    }
    &.personalData {
      width: 26%;
      align-items: flex-start;
      flex-direction: column;
    }
`

export const StyledCardTitle = styled(CardTitle)`
    font-weight: bold;
    margin-top: 5px;
    font-size: 24px;
`

export const StyledCardText = styled(CardText)`
    font-size: 16px;
    &.price {
      margin: 0px;
      font-weight: bold;
      font-size: 30px;
    }
    &.personalizedPlan {
      margin: 2px;
      font-size: 12px;
      color: gray;
    }
    &.personalizedTotal {
      margin: 0px;
      align-self: center;
      font-size: 20px;
      font-weight: 600;
      color: gray;
    }
`

export const StyledInput = styled(Form.Control)`
  font-size: 12px;
  padding: 2px 5px;
  width: 30%;
  height: 30px;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  text-align: center;
  &.budgetForm {
    text-align: start;
  }
`

export const ButtonManage = styled(Button)`
    outline: 0;
    cursor: pointer;
    overflow: visible;
    border-radius: 95px;
    background: #FFD814;
    border: 1px solid #000000;
    font-size: 15px;
    height: 25px;
    width: 25px;
    text-align: center;
    font-weight: bold;
    color: #0F1111;
`

const App = () => {
  const [total, setTotal] = useState(0)
  const [budgetPlans, setBudgetPlans] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [personData, setPersonData] = useState({ name: '', telephone: '', email: '', plans: '', total: '' })
  const [personalizedPlans, setPersonalizedPlans] = useState([])

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

  const handlePersonalizePlan = (key) => (event) => {
    event.preventDefault()
    const newPersonData = event.target.value
    setPersonData((prevData) => ({...prevData, [key]: newPersonData}))
  }

  const createPersonalizePlan = () => {
    event.preventDefault()
    console.log('Created plan:', personData)
    setPersonData((prevData) => ({...prevData, ['plans']: budgetPlans}))
    const newPersonalizedPlan = ({...personData, ['plans']: budgetPlans, ['total']: total})
    setPersonalizedPlans(personalizedPlans.concat(newPersonalizedPlan))
    setIsSubmitted(true)
  }

  const calcTotal = () => {
    const planSum = budgetPlans.reduce((accumulator, currentValue) => 
        accumulator + currentValue.planPrice + ((currentValue.planLangs + currentValue.planPages)*30), 0
    )
    setTotal(planSum)
  }

  return (
    
    <Container>
      <GlobalStyle></GlobalStyle>
      <Header>Get the best quality</Header>
      {cardData.map((element, index) => {
        return(
          <AvailablePlans key={index} 
          title={element.title} description={element.description} setTotal={setTotal} total={total}
          price={element.price} index={index} budgetPlans={budgetPlans} setBudgetPlans={setBudgetPlans}
          calcTotal={calcTotal}>
          </AvailablePlans>
        )
      })}
      <Budget>
        <p>Budget price: {total}€</p>
      </Budget>
      <BudgetForm handlePersonalizePlan={handlePersonalizePlan} 
      createPersonalizePlan={createPersonalizePlan} personData={personData}></BudgetForm>
      {isSubmitted && (
        personalizedPlans.map((plan, planIndex) => (
          <PersonalizePlans key={planIndex} personData={plan}></PersonalizePlans>
        ))
      )}
    </Container>
  )

}

export default App
