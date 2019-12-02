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
        isPaid: false,
        type: "",
      },
      transactionList: []
    }
  }
  handleDateChange = date => {
    this.setState(prevState => ({
      newTransaction: {...prevState.newTransaction, dueDate: date}
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
        isPaid: false,
        type: this.state.newTransaction.type
      }
    }))
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
          handleDateChange={this.handleDateChange}
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
              </tr>
            </thead>
            <tbody>
              {this.state.transactionList.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{moment(transaction.dueDate).utc().format('MM/DD/YYYY')}</td>
                <td>{transaction.type}</td>
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