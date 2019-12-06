import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const moment = require('moment')

const EditModal = (props) => {

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialState = props.transactionDetails

  return (
    <>
      <Button variant="info" onClick={handleShow}>
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
                onChange={props.handleChange}
                defaultValue={initialState.name}
              />
            </Form.Group>
          </Form>
          Name: {props.transactionDetails.name}<br/>
          Amount: {props.transactionDetails.amount}<br/>
          Frequency: {props.transactionDetails.frequency}<br/>
          Due Date: {moment(props.transactionDetails.dueDate).utc().format('MM/DD/YYYY')}<br/>
          End Date:
          {(() => {
            if (props.transactionDetails.endDate === ""){
              return (
                <span> None</span>
                )} else {
                return (
                  <span> {moment(props.transactionDetails.endDate).utc().format('MM/DD/YYYY')}</span>
                )
              }
          })()}<br/>
          Type: {props.transactionDetails.type}<br/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal