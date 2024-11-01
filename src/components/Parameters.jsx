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

const Parameters = ({setTotal, total}) => {
    const [pages, setPages] = useState(1)
    const [lang, setLang] = useState(2)

    const handleChangePages = (event) => {
        const a = parseInt(event.target.value, 10);
        console.log(a)
        setPages(a)
        setTotal(total + ((a + lang)*30))
    }
    const handleChangeLang = (event) => {
        const a = parseInt(event.target.value, 10);
        setLang(a)
        setTotal(total + ((pages + a)*30))
    }

    return (
        <table>
            <tr>
                <td align='right'>
                    <p>Number of pages</p>
                </td>
                <td width='30%' height='20%' align='right'>
                    <Form >
                        <ButtonManage type="submit">-</ButtonManage>
                        <StyledInput
                            name="pages"
                            value={pages}
                            onChange={handleChangePages}
                        />
                        <ButtonManage type="submit">+</ButtonManage>
                    </Form>
                </td>
            </tr>
            <tr>
                <td align='right'> 
                <p>Number of languages</p>
                </td>
                <td width='25%' height='20%' align='right'>
                    <Form >
                        <ButtonManage type="submit">-</ButtonManage>
                        <StyledInput
                            name="languages"
                            value={lang}
                            onChange={handleChangeLang}
                        />
                        <ButtonManage type="submit">+</ButtonManage>
                    </Form>
                </td>
            </tr>
        </table>
    )
}

export default Parameters