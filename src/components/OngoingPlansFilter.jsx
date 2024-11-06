import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { StyledInput } from '../App'
import 'bootstrap-icons/font/bootstrap-icons.css'

export const OngoingNav = styled.div`
  display: flex;
  width: 50%;
  margin-top: 0px;
  margin-left: 10%;
  margin-bottom: 25px;
  gap: 7px;
`
const ButtonNav = styled.button`
    outline: 0;
    cursor: pointer;
    border-radius: 10px;
    background: #89C9AF;
    font-size: 15px;
    width: 40%;
    height: 40%;
    text-align: center;
    font-weight: bold;
    color: black;
    font-family: 'Poppins';
`

const OngoingPlansFilter = ({ personalizedPlans, setFilteredPlans, inputValue, setInputValue, sortPlans }) => {

    const handleFilterChange = (event) => {
        const updatedSearch = event.target.value
        setInputValue(updatedSearch)
        if (event.target.value !== '') {
            const re = new RegExp('^' + updatedSearch, 'i')
            const filteredPersons = personalizedPlans.filter((person) => person.name.search(re) != -1)
            setFilteredPlans(filteredPersons)
        } else {
            setFilteredPlans([])
        } 
    }

    return(
        <OngoingNav>
            <StyledInput className='navPlans' placeholder='Search by name...' onChange={handleFilterChange} value={inputValue}/>
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

export default OngoingPlansFilter