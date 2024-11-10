import { useState } from "react";
import {StyledForm, StyledInput, StyledCardText} from '../App'
import styled from "styled-components"

export const HelpButtonModal = styled.button`
    display: flex;
    justify-content: center;
    align-content: flex-start;
    align-items: center;
    border-radius: 100px;
    border-color: white;
    color: white;
    width: 32px;
    height: 32px;
    margin-left: 14px;
    background-color: blue;
    &:hover {
        background-color: green;
    }
`

const iconStyle = {
    fontSize: '28px',
}

const Parameters = ({setShowModalLangs, setShowModalPages, setSelectedPlans, id}) => {
    const [planProps, setPlanProps] = useState({pages: 1, lang: 2})

    const updatePlanProps = (key, value) => {
        setSelectedPlans((prevItems) => 
            prevItems.map((item) =>
                item.id === id ? {...item,[key]: value } : item
        ))
    }

    const handleChange = (key) => (event) => {
        if (parseInt(event.target.value, 10) <= 0) {
            alert('error')
        } else {
            const newValue = parseInt(event.target.value, 10);
            setPlanProps((prevPlanProps) => ({...prevPlanProps, [key]: newValue }))
            updatePlanProps(key == "pages" ? "planPages" : "planLangs", newValue)
        }
        
    }

    const increment = (key) => (event) => {
        event.preventDefault()
        setPlanProps((prevPlanProps) => {
            const newValue = prevPlanProps[key] + 1
            updatePlanProps(key === "pages" ? "planPages" : "planLangs", newValue)
            return {...prevPlanProps, [key]: newValue}
        })
    }
    const decrement = (key) => (event) => {
        event.preventDefault()
        setPlanProps((prevPlanProps) => {
            const newValue = prevPlanProps[key] - 1
            updatePlanProps(key === "pages" ? "planPages" : "planLangs", newValue)
            return {...prevPlanProps, [key]: newValue}
        })
    }

    return (
        <>
            <div>
                <StyledCardText className="parameters">Number of pages</StyledCardText>
                <StyledCardText className="parameters">Number of languages</StyledCardText>
            </div>
            <div>
                <HelpButtonModal type="button" onClick={decrement("pages")}>
                    <i className="bi bi-dash-circle" style={iconStyle}></i>
                </HelpButtonModal>
                <HelpButtonModal type="button" onClick={decrement("lang")}>
                    <i className="bi bi-dash-circle" style={iconStyle}></i>
                </HelpButtonModal>
            </div>
            <div>
                <StyledForm>
                    <StyledInput $center
                    min='1'
                    name="pages"
                    value={planProps.pages}
                    onChange={handleChange("pages")}/>
                </StyledForm>
                <StyledForm >
                    <StyledInput $center
                        min='1'
                        name="languages"
                        value={planProps.lang}
                        onChange={handleChange("lang")}/>
                </StyledForm>
            </div>
            <div>
                <HelpButtonModal type="button" onClick={increment("pages")}>
                    <i className="bi bi-plus-circle" style={iconStyle}></i>
                </HelpButtonModal>
                <HelpButtonModal type="button"onClick={increment("lang")}>
                    <i className="bi bi-plus-circle" style={iconStyle}></i>
                </HelpButtonModal> 
            </div>
            <div>
                <HelpButtonModal type="button" onClick={() => setShowModalPages(true)}>
                    <i className="bi bi-question-circle-fill" style={iconStyle}></i>
                </HelpButtonModal>
                <HelpButtonModal onClick={() => setShowModalLangs(true)}>
                    <i className="bi bi-question-circle-fill" style={iconStyle}></i>
                </HelpButtonModal>
            </div>
        </>         
    )
}

export default Parameters