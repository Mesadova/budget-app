import {StyledCardTitle, StyledCard, StyledCardBody, CardContainer, StyledCardText} from '../App'

const OngoingPlans = ({personData = {} }) => {
    const { name, telephone, email, total, ...services } = personData
    console.log(personData)

    return(
        <StyledCard className='personalizedPlanCard'>
            <CardContainer className='personalizedPlan'>
                <StyledCardBody className='contractedServices'>
                    {name && <StyledCardTitle>{name}</StyledCardTitle>}
                    {telephone && <StyledCardText className='personalizedPlan'>{telephone}</StyledCardText>}
                    {email && <StyledCardText className='personalizedPlan'>{email}</StyledCardText>}
                </StyledCardBody>
                <StyledCardBody className='contractedServices' >
                    <ul>
                    <StyledCardText className='contractedPlans'>
                        Contracted services:
                        {Object.entries(services).map(([key, value]) => (
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