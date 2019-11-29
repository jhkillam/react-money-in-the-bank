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
        <table style={{
            marginLeft: "auto",
            marginRight: "auto"
          }}>
          <thead>
            <th>
              Name
            </th>
            <th>
              Amount
            </th>
            <th>
              Due Date
            </th>
          </thead>
          <tbody>
            {this.state.transactionList.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.name}</td><td>{transaction.amount}</td><td>{transaction.dueDate}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Transaction