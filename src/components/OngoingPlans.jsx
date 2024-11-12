import {StyledCardTitle, StyledCard, StyledCardBody, CardContainer, StyledCardText} from '../App'

const OngoingPlans = ({customPlans = {} }) => {
    const { name, telephone, email, total, ...selectedPlans } = customPlans

    return(
        <StyledCard className='onGoingPlanCard'>
            <CardContainer className='onGoingPlans'>
                <StyledCardBody className='contractedServices'>
                    {name && <StyledCardTitle>{name}</StyledCardTitle>}
                    {telephone && <StyledCardText className='personalizedPlan'>{telephone}</StyledCardText>}
                    {email && <StyledCardText className='personalizedPlan'>{email}</StyledCardText>}
                </StyledCardBody>
                <StyledCardBody className='contractedServices' >
                    <ul>
                    <StyledCardText className='contractedPlans'>
                        Contracted services:
                        {Object.entries(selectedPlans).map(([key, value]) => (
                            typeof value === "object" && value !== null ? (
                                Object.entries(value).map(([subKey, subValue]) => (
                                    <li key={subKey}>
                                        {subValue.planTitle} 
                                        {subValue.planPages !== null ? ` (${subValue.planPages} pages, ${subValue.planLangs} languages)` : '                   '}
                                    </li>
                                ))
                            ) : null
                        ))}
                    </StyledCardText>
                    </ul>
                </StyledCardBody>
                <StyledCardBody className="header">
                    <StyledCardText className='personalizedTotal'>Total:</StyledCardText>
                    {total && <StyledCardText className='price'>{total} €</StyledCardText>}
                </StyledCardBody>
            </CardContainer>
        </StyledCard>   
    )
}

export default OngoingPlans