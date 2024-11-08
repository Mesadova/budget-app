import { Form } from 'react-bootstrap'
import {StyledCardTitle, StyledCard, StyledCardBody, CardContainer, StyledInput } from '../App'
import { ButtonNav } from './OngoingPlansFilter'


const BudgetForm = ({ handlePersonalizePlan, createPersonalizePlan, personData, validated}) => {
    

    return(
        <StyledCard className='budgetForm'>
            <CardContainer className='budgetForm'>
                <StyledCardTitle>Ask for personalised plan budget</StyledCardTitle>
            </CardContainer>
            <Form noValidate validated={validated} onSubmit={createPersonalizePlan}>
                <StyledCardBody className='budgetForm'>
                        <StyledInput className='budgetForm' placeholder='Name' 
                        value={personData.name} onChange={handlePersonalizePlan('name')} required />
                        <StyledInput className='budgetForm' placeholder='Telephone' 
                        value={personData.telephone} onChange={handlePersonalizePlan('telephone')} required  />
                        <StyledInput className='budgetForm' placeholder='Email' 
                        value={personData.email} onChange={handlePersonalizePlan('email')} required />
                        <ButtonNav  type="submit" >Ask price</ButtonNav>
                </StyledCardBody>
            </Form>
        </StyledCard>
    )
}

export default BudgetForm