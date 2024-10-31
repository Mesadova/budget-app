import styled from "styled-components"
import { Card, CardBody, CardTitle, CardText, FormCheck } from "react-bootstrap"

const StyledCard = styled(Card)`
    display: flex;
    padding: 20px;
    box-shadow: 1px 15px 5px 5px lightgrey;
    width: 40%;
    border-radius: 30px;
    overflow: hidden;
    font-family: Poppins;
    justify-content: space-between;
`

const StyledCardBody = styled(Card)`
    display: flex;
    font-size: 16px;
    width: 30%;
    align-items: center;
    justify-content: center;
    align-content: center;
    &.header {
        align-items: flex-start;
        flex-direction: column;
        width: 45%;
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
    return(
        <StyledCard>
            <StyledCardBody className="header">
                <StyledCardTitle>{props.title}</StyledCardTitle>
                <StyledCardText>{props.description}</StyledCardText>
            </StyledCardBody>
            <StyledCardBody>
                <StyledCardText className="price">{props.price}</StyledCardText><p><b>€</b></p>
            </StyledCardBody>
                
            <StyledCardBody>
                <FormCheck type='checkbox' id={props.index} label={`  Add`}></FormCheck>
            </StyledCardBody>
        </StyledCard>
    )
}

export default AppCard