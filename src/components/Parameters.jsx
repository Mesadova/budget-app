import { useState } from "react";
import { Form } from "react-bootstrap"
import {ButtonManage, StyledInput} from '../App'

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
            <tbody>
                <tr>
                    <td align='right'>
                        <p>Number of pages</p>
                    </td>
                    <td width='30%' height='20%' align='right'>
                        <Form>
                            <ButtonManage type="submit" onClick={decrement("pages")}>-</ButtonManage>
                            <StyledInput
                                name="pages"
                                value={planProps.pages}
                                onChange={handleChange("pages")}/>
                            <ButtonManage type="submit" onClick={increment("pages")}>+</ButtonManage>
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
                                onChange={handleChange("lang")}/>
                            <ButtonManage type="submit"onClick={increment("lang")}>+</ButtonManage>
                        </Form>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Parameters