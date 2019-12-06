import React from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import NewTransactionForm from './NewTransactionForm'
import EditModal from './EditModal'

const moment = require('moment')

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
        endDate: "",
        frequency: this.state.newTransaction.frequency,
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
                <td>&#36;{transaction.amount}</td>
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
                  <EditModal
                    index={index}
                    transactionDetails={this.state.transactionList[index]}
                    handleChange={this.handleChange}
                  />
                  <Button 
                    variant="danger"
                    size="sm"
                    onClick={() => this.removeTransaction(index)}>
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