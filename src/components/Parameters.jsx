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
    const [pages, setPages] = useState(1)
    const [lang, setLang] = useState(2)

    const updatePages = (newPages) => {
        console.log(props)
        props.setBudgetPlans(prevItems => 
            prevItems.map(item =>
                item.id === props.id ? {...item, planPages: newPages} : item
        ))
    }

    const updateLangs = (newLangs) => {
        props.setBudgetPlans(prevItems => 
            prevItems.map(item =>
                item.id === props.id ? {...item, planLangs: newLangs} : item
        ))
    }

    const handleChangePages = (event) => {
        const newPages = parseInt(event.target.value, 10);
        setPages(newPages)
        updatePages(newPages)
    }

    const handleChangeLang = (event) => {
        const newLangs = parseInt(event.target.value, 10);
        setLang(newLangs)
        updateLangs(newLangs)
    }

    const addPage = (event) => {
        event.preventDefault()
        const newPages = pages + 1
        setPages(newPages)
        updatePages(newPages)
    }

    const addLang = (event) => {
        event.preventDefault()
        const newLangs = lang + 1
        setLang(newLangs)
        updateLangs(newLangs)
    }
    const delPage = (event) => {
        event.preventDefault()
        const newPages = pages - 1
        setPages(newPages)
        updatePages(newPages)
    }

    const delLang = (event) => {
        event.preventDefault()
        const newLangs = lang - 1
        setLang(newLangs)
        updateLangs(newLangs)
    }

    return (
        <table>
            <tr>
                <td align='right'>
                    <p>Number of pages</p>
                </td>
                <td width='30%' height='20%' align='right'>
                    <Form >
                        <ButtonManage type="submit" onClick={delPage}
                            >-</ButtonManage>
                        <StyledInput
                            name="pages"
                            value={pages}
                            onChange={handleChangePages}
                        />
                        <ButtonManage type="submit" onClick={addPage}
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
                        <ButtonManage type="submit" onClick={delLang}>-</ButtonManage>
                        <StyledInput
                            name="languages"
                            value={lang}
                            onChange={handleChangeLang}
                        />
                        <ButtonManage type="submit"onClick={addLang}>+</ButtonManage>
                    </Form>
                </td>
            </tr>
        </table>
    )
}

export default Parameters