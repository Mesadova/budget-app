import { useState, useEffect } from 'react'
import { Form } from "react-bootstrap"
import AvailablePlans from './components/AvailablePlans'
import BudgetForm from './components/BudgetForm'
import { styled, createGlobalStyle  } from 'styled-components'
import OngoingPlans from './components/OngoingPlans'
import Parameters from './components/Parameters'
import OngoingPlansNav from './components/OngoingPlansNav.jsx'
import HelpModal from './components/HelpModal.jsx'

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
  &.start {
    justify-content: flex-start;
    align-items: flex-start;
  }
`

const Budget = styled.div`
  margin-left: 35%;
  font-size: 30px;
  font-weight: bold;
  color: white;
  &.onGoing {
    margin-left: -40%;
    margin-bottom: -1%;
  }
`

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    min-width: 45%;
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
    &.personalizedPlanCard {
      height: 100%;
      
    }
`

export const CardContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    gap: 30px;
    margin-bottom: 14px;

    &.parameters {
      display: grid;
      grid-template-columns: 1fr 45px 25px 40px 45px;
      justify-content: flex-end;
      text-align: end;
      align-items: center;
      flex-grow: 0;
      gap: 8px;
    }

    &.budgetForm {
      align-items: flex-start;
      justify-content: flex-start;
      align-content: flex-start;
      flex-direction: column;
    }

    &.personalizedPlan {
      display: grid;
      flex-wrap: wrap;
      gap: 0;
      margin: 0;
      padding: 0;
      height: 150px;
      grid-template-columns: 250px 1fr 110px;
    }
`

export const StyledCardBody = styled.div`
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    &.header {
      align-items: center;
      flex-direction: column;
    }
    &.headerStart {
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
    }
    &.budgetForm {
      gap: 20px;
      margin-bottom: 20px;
    }
    &.personalData {
      flex-wrap: wrap;
      align-items: flex-start;
      flex-direction: column;
      max-width: 15%;
    }
    &.contractedServices {
      flex-wrap: wrap;
      align-items: flex-start;
      flex-direction: column;
    }
    &.parameters{
      height: 130px;
    }
`

export const StyledCardTitle = styled.p`
    font-weight: bold;
    margin-top: 5px;
    font-size: 24px;
    margin-bottom: 0;
`

export const StyledCardText = styled.p`
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
    &.contractedPlans {
      margin: 0;
      padding: 0;
      align-self: start;
      font-size: 14px;
    }
    &.parameters {
      margin-bottom: 8px;
      padding-top: 8px;
    }
`

export const StyledInput = styled(Form.Control)`
  font-size: 12px;
  height: 35px;
  border-radius: 7px;
  border-color: gray;
  justify-content: end;
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
export const StyledForm = styled(Form)`
  font-size: 12px;
  width: 40px;
  justify-content: flex-end;
  text-align: center;
`

export const ButtonManage = styled.button`
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
  const [isEnabled, setIsEnabled] = useState(false);
  const [showModalPages, setShowModalPages] = useState(false)
  const [showModalLangs, setShowModalLangs] = useState(false)
  const [filteredPlans, setFilteredPlans] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([])
  const [personalizedPlans, setPersonalizedPlans] = useState([])
  const [personData, setPersonData] = useState({ name: '', telephone: '', email: '', plans: '', total: '' })
  const [availablePlans, setAvailablePlans] = useState([
    {title: 'Seo', description: 'Programming of a full responsive web design.', price: 300},
    {title: 'Ads', description: 'Programming of a full responsive web design.', price: 400},
    {title: 'Web', description: 'Programming of a full responsive web design.', price: 500}
  ])

  useEffect(() => {
    calcTotal()
  }, [selectedPlans])

  const toggleSwitch = (e) => {
    setIsEnabled(e.target.checked)
    if (e.target.checked) {
      discount()
    } else {
      revertDiscount()
    }
  }

  const discount = () => {
    const availableDiscounted = availablePlans.map((prevPlanProps) => ({...prevPlanProps, ['price']: (prevPlanProps.price - (prevPlanProps.price*0.2)) }))
    const selectedDiscount = selectedPlans.map((prevPlanProps) => ({...prevPlanProps, ['planPrice']: (prevPlanProps.planPrice - (prevPlanProps.planPrice*0.2)) }))
    const personalizedPlansDiscount = personalizedPlans.map((prevPlanProps) => ({...prevPlanProps, ['total']: prevPlanProps.total - (prevPlanProps.total*0.2)}))
    if (filteredPlans) {
      const filteredPlansDiscount = personalizedPlans.map((prevPlanProps) => ({...prevPlanProps, ['total']: prevPlanProps.total - (prevPlanProps.total*0.2)}))
      setFilteredPlans(filteredPlansDiscount)
    }
    setAvailablePlans(availableDiscounted)
    setSelectedPlans(selectedDiscount)
    setPersonalizedPlans(personalizedPlansDiscount)
  }
  const revertDiscount = () => {
    const availableDiscounted = availablePlans.map((prevPlanProps) => ({...prevPlanProps, ['price']: (prevPlanProps.price + (prevPlanProps.price*0.25)) }))
    const selectedDiscount = selectedPlans.map((prevPlanProps) => ({...prevPlanProps, ['planPrice']: (prevPlanProps.planPrice + (prevPlanProps.planPrice*0.25)) }))
    const personalizedPlansDiscount = personalizedPlans.map((prevPlanProps) => ({...prevPlanProps, ['total']: prevPlanProps.total + (prevPlanProps.total*0.25)}))
    if (filteredPlans) {
      const filteredPlansDiscount = personalizedPlans.map((prevPlanProps) => ({...prevPlanProps, ['total']: prevPlanProps.total + (prevPlanProps.total*0.25)}))
      setFilteredPlans(filteredPlansDiscount)
    }
    setAvailablePlans(availableDiscounted)
    setSelectedPlans(selectedDiscount)
    setPersonalizedPlans(personalizedPlansDiscount)
  }

  const calcTotal = () => {
    if (isEnabled) {
      const planSumDiscount = selectedPlans.reduce((accumulator, currentValue) => 
        accumulator + currentValue.planPrice + (((currentValue.planLangs + currentValue.planPages) * 30)-(((currentValue.planLangs + currentValue.planPages) * 30) * 0.2)), 0)
      setTotal(planSumDiscount)
    } else {
      const planSum = selectedPlans.reduce((accumulator, currentValue) => 
        accumulator + currentValue.planPrice + ((currentValue.planLangs + currentValue.planPages) * 30), 0)
      setTotal(planSum)
    }
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
      if (isEnabled) {
        const planSumDiscount = selectedPlans.reduce((accumulator, currentValue) => 
          accumulator + currentValue.planPrice + (((currentValue.planLangs + currentValue.planPages) * 30)-(((currentValue.planLangs + currentValue.planPages) * 30) * 0.2)), 0)
        const newPersonalizedPlan = ({...personData, ['plans']: selectedPlans, ['total']: planSumDiscount,
          ['date']: `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`})
        setPersonalizedPlans(personalizedPlans.concat(newPersonalizedPlan))
       } else {
        const planSum = selectedPlans.reduce((accumulator, currentValue) => 
          accumulator + currentValue.planPrice + ((currentValue.planLangs + currentValue.planPages) * 30), 0)
        const newPersonalizedPlan = ({...personData, ['plans']: selectedPlans, ['total']: planSum,
          ['date']: `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`})
        setPersonalizedPlans(personalizedPlans.concat(newPersonalizedPlan))
       }
      setIsSubmitted(true)
      setSelectedPlans([])
    } else {
      alert('Select one plan please')
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
  <>
    <Container>
      <GlobalStyle></GlobalStyle>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Check this switch"
          checked={isEnabled}
          onChange={toggleSwitch}
        />
      </Form>
      <Header>Get the best quality</Header>
      {availablePlans.map((element, index) => {
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
                  <Parameters 
                    id={index} selectedPlans={selectedPlans} setSelectedPlans={setSelectedPlans}
                    setShowModalLangs={setShowModalLangs} setShowModalPages={setShowModalPages}
                  />
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
      <OngoingPlansNav filteredPlans={filteredPlans} setFilteredPlans={setFilteredPlans}
      personalizedPlans={personalizedPlans} setPersonalizedPlans={setPersonalizedPlans}></OngoingPlansNav>
      {isSubmitted ? (filteredPlans ? (
        filteredPlans.map((data, index) => (<OngoingPlans key={index} customPlans={data}></OngoingPlans>))
      ) : (personalizedPlans.map((data, index) => (<OngoingPlans key={index} customPlans={data}></OngoingPlans>))
      )) : (null)}
    </Container>
    <HelpModal show={showModalLangs} onHide={() => setShowModalLangs(false)}/>
    <HelpModal show={showModalPages} onHide={() => setShowModalPages(false)}/>
  </>
  )
}

export default App
