import {StyledCardTitle, StyledCard, StyledCardBody, CardContainer, StyledCardText} from '../App'

const PersonalizePlans = ({personData}) => {
    
    return(
        <StyledCard>
            <CardContainer className='personalizedPlan'>
                <StyledCardBody className="personalData">
                    {personData.name && <StyledCardTitle>{personData.name}</StyledCardTitle>}
                    {personData.telephone && <StyledCardText className='personalizedPlan'>{personData.telephone}</StyledCardText>}
                    {personData.email && <StyledCardText className='personalizedPlan'>{personData.email}</StyledCardText>}
                </StyledCardBody>
                <StyledCardBody>
                    <StyledCardText>
                        Contracted services:
                        <ul>
                        {Object.entries(personData).map(([key, value]) => (
                            typeof value === "object" && value !== null ? (
                                Object.entries(value).map(([subKey, subValue]) => (
                                    <li key={subKey}>{subValue.planTitle} ({subValue.planPages} pages, {subValue.planLangs} languages)</li>
                                ))
                            ) : null
                        ))}
                        </ul>
                    </StyledCardText>
                </StyledCardBody>
                <StyledCardBody className="header">
                    <StyledCardText className='personalizedTotal'>Total:</StyledCardText>
                    {personData.total && <StyledCardText className='price'>{personData.total} €</StyledCardText>}
                </StyledCardBody>
            </CardContainer>
        </StyledCard>   
    )
}

export default PersonalizePlans