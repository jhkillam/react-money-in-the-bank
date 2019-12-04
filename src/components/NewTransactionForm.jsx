import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const NewTransactionForm = ({
  handleChange, 
  handleSubmit, 
  handleStartDateChange, 
  handleEndDateChange, 
  handleCheckboxToggle, 
  newTransaction
}) => {

  return (
    <div className="container">
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formTransactionName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter transaction name"
                onChange={handleChange}
                value={newTransaction.name}
                />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTransactionAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control 
                type="text"
                name="amount"
                placeholder="Enter amount"
                onChange={handleChange}
                value={newTransaction.amount}
                />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.Group controlId="formTransactionType">
              <Form.Label>Type</Form.Label><br/>
              <div onChange={handleChange} className="mb-3">
                <Form.Check
                  type="radio"
                  name="type"
                  id="bill"
                  label="Bill"
                  value="Bill"
                />
                <Form.Check
                  type="radio"
                  name="type"
                  id="income"
                  label="Income"
                  value="Income"
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                id="recurring"
                label="Recurring?"
                onChange={handleCheckboxToggle}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTransactionDueDate">
              <Form.Label>Due Date</Form.Label><br/>
              <DatePicker
                selected={newTransaction.dueDate}
                onChange={handleStartDateChange}
                placeholderText="Pick a due date"
              /><br/><br/>
              <Form.Label>End Date</Form.Label><br/>
              <DatePicker
                selected={newTransaction.endDate}
                onChange={handleEndDateChange}
                placeholderText="Pick an end date"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="outline-info" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  )
}

export default NewTransactionForm