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
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter transaction name"
              onChange={handleChange}
              value={newTransaction.name}
              />
          </Form.Group>
          <Form.Group controlId="formTransactionAmount">
            <Form.Control 
              type="number"
              step="any"
              min="0"
              name="amount"
              placeholder="Enter amount"
              onChange={handleChange}
              value={newTransaction.amount}
              />
          </Form.Group>
          <Form.Group controlId="formTransactionFrequency">
              <Form.Control 
                as="select"
                name="frequency"
                onChange={handleChange}
                defaultValue=""
                >
                <option value="" disabled>Select transaction frequency</option>
                <option>Once</option>
                <option>Monthly</option>
                <option>Bi-weekly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </Form.Control>
          </Form.Group>
          <Form.Group controlId="formTransactionType">
            <Form.Control 
              as="select"
              name="type"
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>Select transaction type</option>
              <option>Expense</option>
              <option>Income</option>
            </Form.Control>
        </Form.Group>
          <Form.Group controlId="formTransactionDueDate">
            <DatePicker
              selected={newTransaction.dueDate}
              onChange={handleStartDateChange}
              placeholderText="Enter start date"
              // isClearable
            />
          </Form.Group>
          <Form.Group controlId="formTransactionEndDate">
            <DatePicker
              selected={newTransaction.endDate}
              onChange={handleEndDateChange}
              placeholderText="Enter end date"
              // isClearable
            />
          </Form.Group>

          {/* <Form.Group controlId="formTransactionType">
            <Form.Label>Type</Form.Label><br/>
            <div onChange={handleChange} className="mb-3">
              <Form.Check
                type="radio"
                name="type"
                id="expense"
                label="Expense"
                value="Expense"
              />
              <Form.Check
                type="radio"
                name="type"
                id="income"
                label="Income"
                value="Income"
              />
            </div>
          </Form.Group> */}
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