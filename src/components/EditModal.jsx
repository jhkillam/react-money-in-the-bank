import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
// import { parseISO } from 'date-fns'

const moment = require('moment')

const EditModal = (props) => {
  const [show, setShow] = React.useState(false)
  const handleShow = () => {
    props.handleEditModalShow()
    setShow(true)
  }
  const handleClose = () => setShow(false)

  const handleSaveChanges = (e) => {
    setShow(false)
    props.handleEditSubmit(e, props.index, props)
  }

  return (
    <>
      <Button 
        variant="info"
        onClick={handleShow}
        size="sm"
      >
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFormTransactionName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={props.handleEditChange}
                // value={transactionDetailsToEdit.name}
                value={props.transactionDetails.name}
              />
            </Form.Group>
            <Form.Group controlId="editFormTransactionAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                onChange={props.handleEditChange}
                value={props.transactionDetails.amount}
              />
            </Form.Group>
            <Form.Group controlId="editFormTransactionFrequency">
              <Form.Label>Frequency</Form.Label>
                <Form.Control 
                  as="select"
                  name="frequency"
                  value={props.transactionDetails.frequency}
                  onChange={props.handleEditChange}
                  >
                  <option>Once</option>
                  <option>Monthly</option>
                  <option>Bi-weekly</option>
                  <option>Weekly</option>
                  <option>Daily</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTransactionType">
              <Form.Label>Type</Form.Label>
              <Form.Control 
                as="select"
                name="type"
                value={props.transactionDetails.type}
                onChange={props.handleEditChange}
              >
                <option>Expense</option>
                <option>Income</option>
            </Form.Control>
        </Form.Group>
            <Form.Group controlId="editFormTransactionDueDate">
              <Form.Label>Due Date</Form.Label><br/>
              <DatePicker
                isClearable={true}
                value={moment(props.transactionDetails.dueDate).utc().format('MM/DD/YYYY')}
                // TODO: Make selected attribute work
                // NEXT LINE MAKES THIS COMPONENT CRASH~~~~~~~~~~~
                // selected={parseISO(props.transactionDetails.dueDate)}
                onChange={props.handleStartDateEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormTransactionEndDate">
              <Form.Label>End Date</Form.Label><br/>
              <DatePicker
                isClearable={true}
                // TODO: Fix invalid date bug
                value={moment(props.transactionDetails.endDate).utc().format('MM/DD/YYYY')}
                // value={'none'}
                // placeholderText={
                //   () => {
                //     if (props.transactionDetails.endDate === ""){
                //       return (
                //         <>None</>
                //         )} else {
                //         return (
                //           <>{moment(props.transactionDetails.endDate).utc().format('MM/DD/YYYY')}</>
                //         )
                //       }
                //   }
                // }
                // TODO: Make selected attribute work
                onChange={props.handleEndDateEditChange}
              />
            </Form.Group>
            <Button 
              type="submit" 
              variant="info" 
              onClick={handleSaveChanges}
              block
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal