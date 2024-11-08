import {StyledCardTitle, StyledCardBody, StyledCardText, CardContainer} from '../App'
import { FormCheck } from "react-bootstrap"

const AvailablePlans = ({title, description, price, index, isPlanChecked, setSelectedPlans, selectedPlans, isEnabled}) => {
    const handleCheckboxChange = (title, price, index) => (e) => {
        let newPlan;
        const checked = e.target.checked
        if (title === "Web") {
          newPlan = { id: index, planTitle: title, planChecked: checked, planPrice: price, planPages: 1, planLangs: 2 }
        } else {
          newPlan = { id: index, planTitle: title, planChecked: checked, planPrice: price, planPages: null, planLangs: null,}
        }
        if (newPlan.planChecked) {
            const addedPlans = [...selectedPlans, newPlan]
            setSelectedPlans(addedPlans)
        } else {
            const removePlans = selectedPlans.filter(element => element.planTitle !== newPlan.planTitle)
            setSelectedPlans(removePlans)
        }
    }
    
    return(
        <CardContainer className='personalizedPlan'>
            <StyledCardBody className="headerStart">
                <StyledCardTitle>{title}</StyledCardTitle>
                <StyledCardText>{description}</StyledCardText>
            </StyledCardBody>
            <StyledCardBody className="header">
                {isEnabled && <StyledCardText discount className="personalizedTotal">Save 20%</StyledCardText>}
                <StyledCardText className="price">{`${price}€`}</StyledCardText>
            </StyledCardBody>
            <StyledCardBody>
                <FormCheck type='checkbox' id={index} label={`  Add`}
                checked={isPlanChecked} onChange={handleCheckboxChange(title, price, index)} />
            </StyledCardBody>
        </CardContainer>   
    )
}

export default AvailablePlans