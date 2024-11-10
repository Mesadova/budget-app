import { Form, Col, Row } from 'react-bootstrap'
import {StyledCardTitle, StyledCard, StyledCardBody, StyledInput } from '../App'
import { ButtonNav } from './OngoingPlansFilter'

const BudgetForm = ({ createPersonalizePlan, personData, setPersonData, validated, setValidated }) => {

    const handlePersonalizePlan = (key) => (event) => {
        event.preventDefault()
        const newPersonData = event.target.value
        setPersonData((prevData) => ({...prevData, [key]: newPersonData}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            createPersonalizePlan()
        }
        setValidated(true)
    }

    return(
        <StyledCard className='budgetForm'>
            <Row className='mb-4'>
                <StyledCardTitle>Ask for personalised plan budget</StyledCardTitle>
            </Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className='mb-0'>
                    <Form.Group as={Col} md="3" controlId="validationName">
                        <StyledInput
                            required
                            className='budgetForm' placeholder='Name'
                            value={personData.name} onChange={handlePersonalizePlan('name')}
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationPhone">
                        <StyledInput
                            required
                            className='budgetForm' placeholder='Telephone' 
                            value={personData.telephone} onChange={handlePersonalizePlan('telephone')}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationEmail">
                        <StyledInput
                            required
                            className='budgetForm' placeholder='Email' 
                            value={personData.email} onChange={handlePersonalizePlan('email')}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationButton">
                        <ButtonNav  type="submit" >Ask price</ButtonNav>
                    </Form.Group>
                </Row>
                <StyledCardBody className='budgetForm'>     
                </StyledCardBody>
            </Form>
        </StyledCard>
    )
}

export default BudgetForm