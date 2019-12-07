import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const moment = require('moment')

const EditModal = (props) => {
  const [show, setShow] = React.useState(false);
  const handleShow = () => {
    props.handleEditModalShow()
    setShow(true)
  }
  const handleClose = () => setShow(false)
  const handleSaveChanges = (e) => {
    setShow(false)
    props.handleEdit(e, props.index, props)
  }
  const transactionDetailsToEdit = props.transactionDetails
  
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
                onChange={props.handleEditChange}
                value={transactionDetailsToEdit.name}
              />
            </Form.Group>
            <Form.Group controlId="editFormTransactionAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                name="amount"
                onChange={props.handleEditChange}
                value={transactionDetailsToEdit.amount}
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
          Index: {props.index}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="outline-danger" onClick={handleClose}>
            Cancel
          </Button> */}
          <Button 
          type="submit" 
          variant="info" 
          onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal