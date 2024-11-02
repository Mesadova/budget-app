import { useState } from "react";
import { Form, Button } from "react-bootstrap"
import styled from "styled-components"

const StyledInput = styled(Form.Control)`
  font-size: 12px;
  padding: 2px 5px;
  width: 30%;
  height: 25px;
  border-radius: 7px;
`;

const ButtonManage = styled(Button)`
    outline: 0;
    cursor: pointer;
    overflow: visible;
    border-radius: 95px;
    background: #FFD814;
    border: 1px solid #000000;
    font-size: 15px;
    height: 25px;
    width: 25px;
    text-align: center;
    font-weight: bold;
    color: #0F1111;
`

const Parameters = (props) => {
    const [planProps, setPlanProps] = useState({pages: 1, lang: 1})

    const updatePlanProps = (key, value) => {
        props.setBudgetPlans((prevItems) => 
            prevItems.map((item) =>
                item.id === props.id ? {...item,[key]: value } : item
        ))
    }

    const handleChange = (key) => (event) => {
        const newValue = parseInt(event.target.value, 10);
        setPlanProps((prevPlanProps) => ({...prevPlanProps, [key]: newValue }))
        updatePlanProps(key == "pages" ? "planPages" : "planLangs", newValue)
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
        <table>
            <tr>
                <td align='right'>
                    <p>Number of pages</p>
                </td>
                <td width='30%' height='20%' align='right'>
                    <Form >
                        <ButtonManage type="submit" onClick={decrement("pages")}
                            >-</ButtonManage>
                        <StyledInput
                            name="pages"
                            value={planProps.pages}
                            onChange={handleChange("pages")}
                        />
                        <ButtonManage type="submit" onClick={increment("pages")}
                            >+</ButtonManage>
                    </Form>
                </td>
            </tr>
            <tr>
                <td align='right'> 
                <p>Number of languages</p>
                </td>
                <td width='25%' height='20%' align='right'>
                    <Form >
                        <ButtonManage type="submit" onClick={decrement("lang")}>-</ButtonManage>
                        <StyledInput
                            name="languages"
                            value={planProps.lang}
                            onChange={handleChange("lang")}
                        />
                        <ButtonManage type="submit"onClick={increment("lang")}>+</ButtonManage>
                    </Form>
                </td>
            </tr>
        </table>
    )
}

export default Parameters