import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import {StyledCardTitle, StyledCard, StyledCardBody, CardContainer, StyledCardText} from '../App'

const HelpModal = (props) => {
    return(
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Number of {props.value}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Add the number of {props.value} that your project needs. Each {props.value} cost is 30€.
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default HelpModal