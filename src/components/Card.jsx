import styled from "styled-components"
import { Card, CardBody, CardTitle, CardText, FormCheck, Row, Col } from "react-bootstrap"
import { useState } from "react"
import Parameters from './Parameters'

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    min-width: 50%;
    padding: 20px;
    box-shadow: -0px 5px 5px 5px grey;
    border-radius: 30px;
    overflow: hidden;
    font-family: Poppins;
    background-color: white;
    align-content: center;
`

const CardContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  border: solid;
  border-color: green;
  gap: 30px;
  &.parameters {
        align-items: flex-end;
        justify-content: flex-end;
        align-content: flex-end;
        flex-direction: column;

    }
`

const StyledCardBody = styled(CardBody)`
    border: solid;
    border-color: blue;
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    align-content: center;
    &.header {
        align-items: flex-start;
        flex-direction: column;
    }
    &.parameters {
    }
    
`

const StyledCardTitle = styled(CardTitle)`
    font-weight: bold;
    margin-top: 10px;
    font-size: 24px;
`

const StyledCardText = styled(CardText)`
    font-size: 16px;
    &.price {
        font-weight: bold;
        font-size: 30px;
    }
`

const AppCard = (props) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked
        setIsChecked(checked)
        if (checked) {
            props.setTotal(props.total + props.price)
        } else {
            props.setTotal(props.total - props.price)
        } 
    }

    return(
        <StyledCard>
            <CardContainer>
                    <StyledCardBody className="header">
                        <StyledCardTitle>{props.title}</StyledCardTitle>
                        <StyledCardText>{props.description}</StyledCardText>
                    </StyledCardBody>
                    <StyledCardBody>
                        <StyledCardText className="price">{props.price}</StyledCardText><p><b>€</b></p>
                    </StyledCardBody>
                    <StyledCardBody>
                        <FormCheck type='checkbox' id={props.index} label={`  Add`}
                        checked={isChecked} onChange={handleCheckboxChange}>
                        </FormCheck>
                    </StyledCardBody>
            </CardContainer>
                {isChecked ? (
                    <CardContainer className='parameters'>
                        <StyledCardBody className='parameters'>
                            <Parameters total={props.total} setTotal={props.setTotal}>
                            </Parameters>
                        </StyledCardBody>
                    </CardContainer>
                ) : (null)}
        </StyledCard>
    )
}

export default AppCard