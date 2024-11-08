import { useState, useEffect } from 'react'
import { styled, createGlobalStyle  } from 'styled-components'
import { Link } from 'react-router-dom'
import { Form } from "react-bootstrap"

// Components:
import AvailablePlans from './components/AvailablePlans'
import BudgetForm from './components/BudgetForm'
import OngoingPlans from './components/OngoingPlans'
import Parameters from './components/Parameters'
import OngoingPlansFilter from './components/OngoingPlansFilter.jsx'
import HelpModal from './components/HelpModal.jsx'

// Styles:
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins';
    background-color: black;
  }
`

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

export const Header = styled.div`
  display: flex;
  width: 60%;
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

export const Budget = styled.div`
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
      align-items: center;
      gap: 0;
      margin: 0;
      padding: 0;
      height: 135px;
      grid-template-columns: 280px 1fr 110px;
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
      margin: ${props => props.$switch ? "10px" : "2px"};
      font-size: ${props => props.$switch ? "20px" : '12px' };
      color: ${props => props.$switch ? "white" : "gray"};
    }
    &.personalizedTotal {
      margin: 0px;
      align-self: center;
      font-size: 20px;
      font-weight: 600;
      color: ${props => props.discount ? "lightgreen" : "gray"};
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
  text-align: ${props => props.$center ? 'center' : 'start'};
`
export const StyledForm = styled(Form)`
  font-size: 12px;
  width: 40px;
  justify-content: flex-end;
  text-align: center;
`

export const StyledSwitch = styled(Form.Check)`
  color: white;
  font-size: 20px;
  
  .form-check-input {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='green'/%3e%3c/svg%3e");
    background-color: ${(props) => (props.checked ? 'lightgreen' : 'white')};
    border-color: ${(props) => (props.checked ? 'lightgreen' : 'gray')};
    color: ${(props) => (props.checked ? 'lightgreen' : 'white')};
  }
`


const App = () => {
  const [total, setTotal] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [errors, setErrors] = useState({})
  const [showModalPages, setShowModalPages] = useState(false)
  const [showModalLangs, setShowModalLangs] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validated, setValidated] = useState(false)
  // --- Initial available plans
  const [availablePlans, setAvailablePlans] = useState([
    {title: 'Seo', description: 'Boost your online visibility and optimize your website.', price: 300},
    {title: 'Ads', description: 'Show your relevant ads based on users interests.', price: 400},
    {title: 'Web', description: 'Programming of a full responsive web design.', price: 500}
  ])
  // --- Arrays manipulation of the plans
  const [personData, setPersonData] = useState({ name: '', telephone: '', email: '', plans: '', total: '' })
  const [selectedPlans, setSelectedPlans] = useState([])
  const [personalizedPlans, setPersonalizedPlans] = useState([])
  const [filteredPlans, setFilteredPlans] = useState([])

  useEffect(() => {
    calcTotal()
  }, [selectedPlans])

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

  const toggleSwitch = (e) => {
    setIsEnabled(e.target.checked)
    if (e.target.checked) { discount() } 
    else { revertDiscount() }
  }

  const discount = () => {
    const availableDiscounted = availablePlans.map((prevPlanProps) => ({...prevPlanProps, ['price']: (prevPlanProps.price - (prevPlanProps.price*0.2)) }))
    const selectedDiscount = selectedPlans.map((prevPlanProps) => ({...prevPlanProps, ['planPrice']: (prevPlanProps.planPrice - (prevPlanProps.planPrice*0.2)) }))
    const personalizedPlansDiscount = personalizedPlans.map((prevPlanProps) => ({...prevPlanProps, ['total']: prevPlanProps.total - (prevPlanProps.total*0.2)}))
    if (filteredPlans.length > 0) {
      const filteredPlansDiscount = filteredPlans.map((prevPlanProps) => ({...prevPlanProps, ['total']: prevPlanProps.total - (prevPlanProps.total*0.2)}))
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
    if (filteredPlans.length > 0) {
      const filteredPlansDiscount = filteredPlans.map((prevPlanProps) => ({...prevPlanProps, ['total']: prevPlanProps.total + (prevPlanProps.total*0.25)}))
      setFilteredPlans(filteredPlansDiscount)
    }
    setAvailablePlans(availableDiscounted)
    setSelectedPlans(selectedDiscount)
    setPersonalizedPlans(personalizedPlansDiscount)
  }

  const handlePersonalizePlan = (key) => (event) => {
    event.preventDefault()
    const newPersonData = event.target.value
    setPersonData((prevData) => ({...prevData, [key]: newPersonData}))
  }

  const createPersonalizePlan = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      const errors = {};
      if (!personData.name) errors.name = "Name is required";
      if (!personData.telephone) errors.name = "Name is required";
      if (!personData.email.includes("@")) errors.email = "Email is invalid";
      setErrors(errors)
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
        setFilteredPlans([])
        sortPlans('reSort')
        setInputValue('')
      } else {
        alert('You must select at least one plan')
      }
    }
    setValidated(true)
  }

  const sortByPrice = () => {
    return personalizedPlans.map((v, i) => {
        return {i, value: v.total }
    })
}
  const sortByName = () => {
    return personalizedPlans.map((v, i) => {
        return {i, value: v.name }
    })
  }
  const sortByDate = () => {
    return personalizedPlans.map((v, i) => {
        return {i, value: v.date }
    })
  }

  const sortPlans = (key) => (event) => {
    event.preventDefault()
    let mapped = {}
    switch (key) {
        case 'name':
            mapped = sortByName()
            break;
        case 'price':
            mapped = sortByPrice()
            break;
        case 'date':
            mapped = sortByDate()
            break;
        default:
            mapped = sortByDate()
            break;
    }
    if (key === 'reSort' | key === 'name') {
        mapped.sort((a, b) => {
            if (a.value > b.value) {return 1}
            if (a.value < b.value) {return -1}
            return 0
        })
    } else {
        mapped.sort((a, b) => {
            if (a.value > b.value) {return -1}
            if (a.value < b.value) {return 1}
            return 0
        })
    }
    const result = mapped.map((v) => personalizedPlans[v.i]);
    setPersonalizedPlans(result)
  }

  return (
  <>
    <Container>
      <GlobalStyle></GlobalStyle>
      <Link to="/">Welcome page</Link>
      <Header>Get the best quality</Header>
      <Form style={{display: 'flex'}}>
        <StyledCardText className='personalizedPlan' $switch >Monthly payment</StyledCardText>
        <StyledSwitch style={{marginTop: '10px', marginLeft: '12px'}}
            type="switch"
            id="custom-switch"
            checked={isEnabled}
            onChange={toggleSwitch}
        />
        <StyledCardText className='personalizedPlan' $switch >Annual payment</StyledCardText>
      </Form>
      {availablePlans.map((element, index) => {
        const isPlanChecked = selectedPlans.some(plan => plan.id === index && plan.planChecked)
        return (
          <StyledCard key={index}>
              <AvailablePlans 
                title={element.title} description={element.description} price={element.price} index={index} isEnabled={isEnabled}
                isPlanChecked={isPlanChecked} setSelectedPlans={setSelectedPlans} selectedPlans={selectedPlans}
              />
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
        personData={personData} validated={validated}>
      </BudgetForm>
      <Budget className='onGoing'>
        <p>Ongoing plans: ({personalizedPlans.length})</p>
      </Budget>
      <OngoingPlansFilter filteredPlans={filteredPlans} setFilteredPlans={setFilteredPlans} inputValue={inputValue} setInputValue={setInputValue}
      personalizedPlans={personalizedPlans} setPersonalizedPlans={setPersonalizedPlans} sortPlans={sortPlans}></OngoingPlansFilter>
      {isSubmitted ? (filteredPlans.length > 0 ? (
        filteredPlans.map((data, index) => (<OngoingPlans key={index} customPlans={data}></OngoingPlans>))
      ) : (personalizedPlans.map((data, index) => (<OngoingPlans key={index} customPlans={data}></OngoingPlans>))
      )) : (null)}
    </Container>
    <HelpModal show={showModalLangs} onHide={() => setShowModalLangs(false)} value={'languages'}/>
    <HelpModal show={showModalPages} onHide={() => setShowModalPages(false)} value={'pages'}/>
  </>
  )
}

export default App
