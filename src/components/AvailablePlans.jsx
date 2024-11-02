//import styled from "styled-components"

import { useEffect, useState } from "react"
import Parameters from './Parameters'
import {StyledCardTitle, StyledCard, StyledCardBody, CardContainer, StyledCardText} from '../App'
import { FormCheck } from "react-bootstrap"


const AvailablePlans = (props) => {
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        props.calcTotal()
    }, [props.budgetPlans])

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked
        const newPlan = {
            id: props.index,
            planTitle: props.title,
            planChecked: checked,
            planPrice: props.price,
            planPages: 1,
            planLangs: 1,
        }
        setIsChecked(checked)
        if (checked) {
            const addedPlans = [...props.budgetPlans, newPlan]
            props.setBudgetPlans(addedPlans)
        } else {
            const removePlans = props.budgetPlans.filter(element => element.planTitle !== newPlan.planTitle)
            props.setBudgetPlans(removePlans)
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
                        checked={isChecked} onChange={handleCheckboxChange} />
                    </StyledCardBody>
            </CardContainer>
                {isChecked ? (
                    <CardContainer className='parameters'>
                        <StyledCardBody className='parameters'>
                            <Parameters id={props.index} budgetPlans={props.budgetPlans}
                            setBudgetPlans={props.setBudgetPlans} />
                        </StyledCardBody>
                    </CardContainer>
                ) : (null)}
        </StyledCard>
    )
}

export default AvailablePlans