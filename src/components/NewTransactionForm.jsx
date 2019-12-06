import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const NewTransactionForm = ({
  handleChange, 
  handleSubmit, 
  handleStartDateChange, 
  handleEndDateChange, 
  newTransaction
  }) => {

  return (
    <div className="container">
      <Form>
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
        <Form.Group controlId="formTransactionFrequency">
          <Form.Label>Frequency</Form.Label>
            <Form.Control 
              as="select"
              name="frequency"
              onChange={handleChange}
              >
              <option>Once</option>
              <option>Monthly</option>
              <option>Bi-weekly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </Form.Control>
        </Form.Group>
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
        <Button 
          type="submit"
          variant="info"
          block
          onClick={handleSubmit}>
          Add transaction
        </Button>
      </Form>
    </div>
  )
}

export default NewTransactionForm