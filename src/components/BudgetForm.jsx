import { Button, Form } from 'react-bootstrap'
import {StyledCardTitle, StyledCard, StyledCardBody, CardContainer, StyledInput} from '../App'
import styled from 'styled-components'

const ButtonBudgetForm = styled(Button)`
    outline: 0;
    cursor: pointer;
    overflow: visible;
    border-radius: 10px;
    background: #89C9AF;
    font-size: 15px;
    height: 30px;
    width: 25%;
    text-align: center;
    font-weight: bold;
    color: black;
    font-family: 'Poppins';
`

const BudgetForm = ({ handlePersonalizePlan, createPersonalizePlan, personData, errors}) => {
    return(
        <StyledCard className='budgetForm'>
            <CardContainer className='budgetForm'>
                    <StyledCardBody className="header">
                        <StyledCardTitle>Personalize your own plan</StyledCardTitle>
                    </StyledCardBody>
            </CardContainer>
            <Form onSubmit={createPersonalizePlan}>
                <StyledCardBody className='budgetForm'>
                        <StyledInput className='budgetForm' placeholder='Name' 
                        value={personData.name} onChange={handlePersonalizePlan('name')} required />
                        <StyledInput className='budgetForm' placeholder='Telephone' 
                        value={personData.telephone} onChange={handlePersonalizePlan('telephone')} required  />
                        <StyledInput className='budgetForm' placeholder='Email' 
                        value={personData.email} onChange={handlePersonalizePlan('email')} required />
                        <ButtonBudgetForm  type="submit" >Ask plan price</ButtonBudgetForm>
                </StyledCardBody>
            </Form>
        </StyledCard>
    )
}

export default BudgetForm