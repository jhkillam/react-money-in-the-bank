import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const EditBalanceModal = (props) => {
  const [show, setShow] = React.useState(false)
  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => setShow(false)

  const handleSaveChanges = (e) => {
    setShow(false)
    props.handleBalanceEditSubmit(e)
  }

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFormTransactionName">
              <Form.Label>Balance</Form.Label>
              <Form.Control
                type="number"
                name="balance"
                ref={props.editBalanceInput}
                defaultValue={props.balance}
              />
            </Form.Group>
            <Button 
            type="submit" 
            variant="info" 
            onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditBalanceModal