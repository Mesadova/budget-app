import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { StyledInput } from '../App'
import 'bootstrap-icons/font/bootstrap-icons.css'

export const OngoingNav = styled.div`
  display: flex;
  width: 35%;
  margin-top: 0px;
  margin-left: 15%;
  gap: 7px;
`
const ButtonNav = styled(Button)`
    outline: 0;
    cursor: pointer;
    border-radius: 10px;
    background: #89C9AF;
    font-size: 15px;
    width: 40%;
    height: 40%px;
    text-align: center;
    font-weight: bold;
    color: black;
    font-family: 'Poppins';
`

const OngoingPlansNav = ({setPersonalizedPlans, personalizedPlans}) => {

    const sortByPrice = () => {
        return personalizedPlans.map((v, i) => {
            console.log(v,i)
            return {i, value: v.total }
        })
    }
    const sortByName = () => {
        return personalizedPlans.map((v, i) => {
            console.log(v,i)
            return {i, value: v.name }
        })
    }
    const sortByDate = () => {
        return personalizedPlans.map((v, i) => {
            console.log(v,i)
            return {i, value: v.date }
        })
    }

    const sortPlans = (key) => (event) => {
        event.preventDefault()
        let mapped = {}
        switch (key) {
            case 'name':
                mapped = sortByName()
                break;
            case 'price':
                mapped = sortByPrice()
                break;
            case 'date':
                mapped = sortByDate()
                break;
            default:
                mapped = sortByDate()
                break;
        }
        if (key === 'reSort') {
            mapped.sort((a, b) => {
                if (a.value > b.value) {
                    return -1;
                }
                if (a.value < b.value) {
                    return 1;
                }
                return 0;
            })
        } else {
            mapped.sort((a, b) => {
                if (a.value > b.value) {
                    return 1;
                }
                if (a.value < b.value) {
                    return -1;
                }
                return 0;
            })
        }
        const result = mapped.map((v) => personalizedPlans[v.i]);
        console.log(result)
        setPersonalizedPlans(result)
    }

    return(
        <OngoingNav>
            <StyledInput className='navPlans' placeholder='Search...'/>
            <ButtonNav onClick={sortPlans('date')}>
                <i className="bi bi-calendar-week"></i> Date</ButtonNav>
            <ButtonNav onClick={sortPlans('price')}>
                <i className="bi bi-cash-coin"></i> Price</ButtonNav>
            <ButtonNav onClick={sortPlans('name')}>
                <i className="bi bi-person-lines-fill"></i> Name</ButtonNav>
            <ButtonNav onClick={sortPlans('reSort')}>
                <i className="bi bi-arrow-clockwise"></i> Refresh</ButtonNav>
        </OngoingNav>
    )

}

export default OngoingPlansNav