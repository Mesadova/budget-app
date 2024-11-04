import {StyledCardTitle, StyledCardBody, StyledCardText, CardContainer} from '../App'
import { FormCheck } from "react-bootstrap"

const AvailablePlans = ({title, description, price, index, isPlanChecked, handleCheckboxChange}) => {
    return(
        <CardContainer>
            <StyledCardBody className="headerStart">
                <StyledCardTitle>{title}</StyledCardTitle>
                <StyledCardText>{description}</StyledCardText>
            </StyledCardBody>
            <StyledCardBody>
                <StyledCardText className="price">{price}</StyledCardText><p><b>€</b></p>
            </StyledCardBody>
            <StyledCardBody>
                <FormCheck type='checkbox' id={index} label={`  Add`}
                checked={isPlanChecked} onChange={handleCheckboxChange(title, price, index)} />
            </StyledCardBody>
        </CardContainer>   
    )
}

export default AvailablePlans