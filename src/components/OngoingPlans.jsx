import {StyledCardTitle, StyledCard, StyledCardBody, CardContainer, StyledCardText} from '../App'

const OngoingPlans = ({personData = {} }) => {
    const { name, telephone, email, total, ...services } = personData

    return(
        <StyledCard>
            <CardContainer className='personalizedPlan'>
                <StyledCardBody className="personalData">
                    {name && <StyledCardTitle>{name}</StyledCardTitle>}
                    {telephone && <StyledCardText className='personalizedPlan'>{telephone}</StyledCardText>}
                    {email && <StyledCardText className='personalizedPlan'>{email}</StyledCardText>}
                </StyledCardBody>
                <StyledCardBody>
                    <StyledCardText>
                        Contracted services:
                        <ul>
                        {Object.entries(services).map(([key, value]) => (
                            typeof value === "object" && value !== null ? (
                                Object.entries(value).map(([subKey, subValue]) => (
                                    <li key={subKey}>
                                        {subValue.planTitle} 
                                        {subValue.planPages !== null ? ` (${subValue.planPages} pages, ${subValue.planLangs} languages)` : ''}
                                    </li>
                                ))
                            ) : null
                        ))}
                        </ul>
                    </StyledCardText>
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