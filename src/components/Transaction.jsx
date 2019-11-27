import React from 'react'

import NewTransactionForm from './NewTransactionForm'

class Transaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTransaction: {
        name: "",
        amount: 0,
        dueDate: "",
        isPaid: false,
        type: "",
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
  handleSubmit = e => {
    e.preventDefault()
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, prevState.newTransaction],
      newTransaction: { 
        name: "",
        amount: 0,
        dueDate: "",
        isPaid: false,
        type: "", 
      }
    }))
  }
  render() {
    return (
      <div>
        <NewTransactionForm
          handleChange={this.handleChange}
          newTransaction={this.state.newTransaction}
          handleSubmit={this.handleSubmit}
        />
        <ul>
          {this.state.transactionList.map((transaction, index) => (
            <li key={index}>
              Name: {transaction.name} Amount: {transaction.amount}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Transaction