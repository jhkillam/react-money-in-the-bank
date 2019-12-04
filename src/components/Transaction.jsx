import React from 'react'

import Table from 'react-bootstrap/Table'
import NewTransactionForm from './NewTransactionForm'

const moment = require('moment')

class Transaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTransaction: {
        name: "",
        amount: "",
        dueDate: "",
        recurring: false,
        isPaid: false,
        type: "",
      },
      transactionList: []
    }
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
  handleCheckboxToggle = () => {
    this.setState(prevState => ({
      newTransaction: {...prevState.newTransaction, recurring: !this.state.newTransaction.recurring}
    }))
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState(prevState => ({
      newTransaction: {...prevState.newTransaction, [name]: value}
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
        recurring: this.state.newTransaction.recurring,
        isPaid: false,
        type: this.state.newTransaction.type,
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
        <NewTransactionForm
          handleChange={this.handleChange}
          newTransaction={this.state.newTransaction}
          handleSubmit={this.handleSubmit}
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          handleCheckboxToggle={this.handleCheckboxToggle}
        />
        <div className="container">
          <Table 
            style={{
              marginLeft: "auto",
              marginRight: "auto"
            }}
            striped
            bordered
            hover
            variant="dark"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Type</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactionList.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{moment(transaction.dueDate).utc().format('MM/DD/YYYY')}</td>
                <td>{transaction.type}</td>
                <td><button onClick={() => this.removeTransaction(index)}>X</button></td>
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