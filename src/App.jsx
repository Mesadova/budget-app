import { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, CardText, Form, Button} from "react-bootstrap"
import AvailablePlans from './components/AvailablePlans'
import BudgetForm from './components/BudgetForm'
import { styled, createGlobalStyle  } from 'styled-components'
import OngoingPlans from './components/OngoingPlans'
import Parameters from './components/Parameters'
import OngoingPlansNav from './components/OngoingPlansNav.jsx'

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
  color: white;
  &.onGoing {
    margin-left: -35%;
    margin-bottom: -3%;
  }
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
      margin-bottom: 120px;
      &:after {
        content: "";
        position: relative;
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
  &.navPlans {
    text-align: start;
    height: 25px;
    width: 70%;
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([])
  const [personalizedPlans, setPersonalizedPlans] = useState([])
  const [personData, setPersonData] = useState({ name: '', telephone: '', email: '', plans: '', total: '' })
  const cardData = [
    {title: 'Seo', description: 'Programming of a full responsive web design.', price: 300},
    {title: 'Ads', description: 'Programming of a full responsive web design.', price: 400},
    {title: 'Web', description: 'Programming of a full responsive web design.', price: 500}
  ]

  useEffect(() => {
    calcTotal()
  }, [selectedPlans])

  const calcTotal = () => {
    const planSum = selectedPlans.reduce((accumulator, currentValue) => 
        accumulator + currentValue.planPrice + ((currentValue.planLangs + currentValue.planPages) * 30), 0
    )
    setTotal(planSum)
  }

  const handlePersonalizePlan = (key) => (event) => {
    event.preventDefault()
    const newPersonData = event.target.value
    setPersonData((prevData) => ({...prevData, [key]: newPersonData}))
  }

  const createPersonalizePlan = (event) => {
    event.preventDefault()
    if (selectedPlans.length !== 0) {
      setPersonData((prevData) => ({...prevData, ['plans']: selectedPlans}))
      const newPersonalizedPlan = ({...personData, ['plans']: selectedPlans, ['total']: total,
                                  ['date']: `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`})
      setPersonalizedPlans(personalizedPlans.concat(newPersonalizedPlan))
      setIsSubmitted(true)
      setSelectedPlans([])
    } else {
      console.log('select a plan')
    }
  }

  const handleCheckboxChange = (title, price, index) => (e) => {
    let newPlan;
    const checked = e.target.checked
    if (title === "Web") {
      newPlan = {
        id: index,
        planTitle: title,
        planChecked: checked,
        planPrice: price,
        planPages: 1,
        planLangs: 2,
      }
    } else {
      newPlan = {
        id: index,
        planTitle: title,
        planChecked: checked,
        planPrice: price,
        planPages: null,
        planLangs: null,
      }
    }
    if (newPlan.planChecked) {
        const addedPlans = [...selectedPlans, newPlan]
        setSelectedPlans(addedPlans)
    } else {
        const removePlans = selectedPlans.filter(element => element.planTitle !== newPlan.planTitle)
        setSelectedPlans(removePlans)
    }
  }

  return (
    <Container>
      <GlobalStyle></GlobalStyle>
      <Header>Get the best quality</Header>
      {cardData.map((element, index) => {
        const isPlanChecked = selectedPlans.some(plan => plan.id === index && plan.planChecked)
        return (
          <StyledCard key={index}>
            <CardContainer>
              <AvailablePlans 
                title={element.title} description={element.description} price={element.price} index={index}
                isPlanChecked={isPlanChecked} handleCheckboxChange={handleCheckboxChange} 
              />
            </CardContainer>
            {isPlanChecked && index === 2 && (
              <CardContainer className='parameters'>
                <StyledCardBody className='parameters'>
                  <Parameters 
                    id={index} selectedPlans={selectedPlans} setSelectedPlans={setSelectedPlans} 
                  />
                </StyledCardBody>
              </CardContainer>
            )}
          </StyledCard>
        )
      })}
      <Budget>
        <p>Budget price: {total}€</p>
      </Budget>
      <BudgetForm 
        handlePersonalizePlan={handlePersonalizePlan} createPersonalizePlan={createPersonalizePlan} 
        personData={personData}>
      </BudgetForm>
      <Budget className='onGoing'>
        <p>Ongoing plans:</p>
      </Budget>
      <OngoingPlansNav personalizedPlans={personalizedPlans} setPersonalizedPlans={setPersonalizedPlans}></OngoingPlansNav>
      {isSubmitted && (
        personalizedPlans.map((plan, planIndex) => (
          <OngoingPlans key={planIndex} personData={plan}></OngoingPlans>
        ))
      )}
    </Container>
  )
}

export default App
