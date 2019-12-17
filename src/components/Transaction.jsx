import React from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import NewTransactionForm from './NewTransactionForm'
import EditModal from './EditModal'
import ErrorBoundary from './ErrorBoundary'

const moment = require('moment')
const uuid = require('uuid/v1')

class Transaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTransaction: {
        name: "",
        amount: "",
        dueDate: "",
        endDate: "",
        frequency: "Once",
        isPaid: false,
        type: "Expense", 
        transactionId: uuid()
      },
      editedTransaction: {
        name: "",
        amount: "",
        dueDate: "",
        endDate: "",
        frequency: "Once",
        isPaid: false,
        type: "Expense",
        transactionId: uuid()
      },
      transactionList: []
    }
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState(prevState => ({
      newTransaction: {...prevState.newTransaction, [name]: value}
    }))
  }
  handleStartDateChange = date => {
    this.setState(prevState => ({
      newTransaction: {...prevState.newTransaction, dueDate: date}
    }))
  }
  handleEndDateChange = date => {
    this.setState(prevState => ({
      newTransaction: {...prevState.newTransaction, endDate: date}
    }))
  }
  handleSubmit = e => {
    e.preventDefault()
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, prevState.newTransaction],
      newTransaction: { 
        name: "",
        amount: "",
        dueDate: "",
        endDate: "",
        frequency: this.state.newTransaction.frequency,
        isPaid: false,
        type: this.state.newTransaction.type,
        transactionId: uuid()
      }
    }))
  }
  setEditingTransaction = (transactionToEdit) => {
    const transactionCopy = {...transactionToEdit}
    transactionCopy.transactionId = uuid()
    this.setState({
      editedTransaction: transactionCopy
    })
  }
  handleEditChange = e => {
    const { name, value } = e.target
    this.setState(prevState => ({
      editedTransaction: {...prevState.editedTransaction, [name]: value}
    }))
  }
  handleStartDateEditChange = date => {
    this.setState(prevState => ({
      editedTransaction: {...prevState.editedTransaction, dueDate: date}
    }))
  }
  handleEndDateEditChange = date => {
    this.setState(prevState => ({
      editedTransaction: {...prevState.editedTransaction, endDate: date}
    }))
  }
  handleEditSubmit = (e, index, props) => {
    e.preventDefault()
    const previousTransactionList = this.state.transactionList
    previousTransactionList.splice(index, 1, this.state.editedTransaction)
    const updatedTransactionList = previousTransactionList
    
    this.setState(() => ({
      transactionList: updatedTransactionList,
      editedTransaction: { 
        name: "",
        amount: "",
        dueDate: "",
        endDate: "",
        frequency: "Once",
        isPaid: false,
        type: "",
        transactionId: uuid()
      }
    }))
  }
  removeTransaction(index) {
    if (index < (this.state.transactionList).length){
      const currentTransactionList = [...this.state.transactionList]
      const newTransactionList = currentTransactionList
      newTransactionList.splice(index, 1)
      localStorage.setItem('transactionList', JSON.stringify(newTransactionList))
      this.setState({
        transactionList: newTransactionList
      })
    }
  }
  componentDidMount() {
    if (localStorage.getItem('transactionList')) {
      this.setState({
        transactionList: JSON.parse(localStorage.getItem('transactionList'))
      })
    }
  }
  componentDidUpdate() {
    localStorage.setItem('transactionList', JSON.stringify(this.state.transactionList));
  }
  render() {
    return (
      <div>
        <div className="container">
          <p>Input transactions here to see how they affect your forecast on the other tabs.</p>
        </div>
        <NewTransactionForm
          handleChange={this.handleChange}
          newTransaction={this.state.newTransaction}
          handleSubmit={this.handleSubmit}
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
        />
        <div className="container">
          <Table 
            responsive
            style={{
              marginLeft: "auto",
              marginRight: "auto"
            }}
            striped
            bordered
            hover
            variant="dark"
            size="sm"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Frequency</th>
                <th>Due Date</th>
                <th>End Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactionList.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.frequency}</td>
                <td>{moment(transaction.dueDate).utc().format('MM/DD/YYYY')}</td>
                {(() => {
                  if (transaction.endDate === ""){
                    return (
                      <td>None</td>
                      )} else {
                      return (
                        <td>{moment(transaction.endDate).utc().format('MM/DD/YYYY')}</td>
                      )
                    }
                })()}
                <td>{transaction.type}</td>
                <td>
                  <ErrorBoundary>
                    <EditModal
                      index={index}
                      handleEditModalShow={() => this.setEditingTransaction(this.state.transactionList[index])}
                      transactionDetails={this.state.editedTransaction}
                      handleEditChange={this.handleEditChange}
                      handleStartDateEditChange={this.handleStartDateEditChange}
                      handleEndDateEditChange={this.handleEndDateEditChange}
                      handleEditSubmit={this.handleEditSubmit}
                    />
                  </ErrorBoundary>
                  <Button 
                    variant="danger"
                    onClick={() => this.removeTransaction(index)}
                    size="sm"
                  >
                    X
                  </Button>
                </td>
              </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default Transaction