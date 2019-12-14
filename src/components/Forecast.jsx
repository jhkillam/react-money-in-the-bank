import React from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { RRule } from 'rrule'

import EditBalanceModal from './EditBalanceModal'

const moment = require('moment')

let forecast = []
let sortedForecast = []
let forecastedBalance = 0
let formattedTransactionAmount = 0
let forecastTransactionEndDate
let today = new Date()

class Forecast extends React.Component {
  constructor(props) {
    let localTransactionList = JSON.parse(localStorage.getItem('transactionList'))
    let localBalance = JSON.parse(localStorage.getItem('balance'))
    super(props)
    this.state = {
      transactionList: localTransactionList, 
      balance: localBalance,
    }
    this.editBalanceInput = React.createRef()
  }
  handleBalanceEditSubmit = e => {
    console.log(this.editBalanceInput.current.value)
    e.preventDefault()
    this.setState({ balance: this.editBalanceInput.current.value })
  }
  markAsPaid(index) {
    const currentForecastList = [...this.state.transactionList]
    const newForecastList = currentForecastList
    const newForecastedBalance = parseFloat(this.state.balance) - parseFloat(this.state.transactionList[index].amount)
    newForecastList.splice(index, 1)
    this.setState({
      transactionList: newForecastList,
      balance: newForecastedBalance
    })
  }
  calculateForecast() {
    forecast = []
    sortedForecast = []
    
    this.state.transactionList.map((transaction) => {
      if (transaction.endDate === '') {
        forecastTransactionEndDate = today.setFullYear(today.getFullYear() + 5)
      } else (
        forecastTransactionEndDate = new Date(transaction.endDate)
      )
      if (transaction.frequency === 'Monthly') {
        const monthlyRule = new RRule({
          freq: RRule.MONTHLY,
          dtstart: new Date(transaction.dueDate),
          interval: 1,
          until: forecastTransactionEndDate
        })
        let recurringDatesArray = monthlyRule.all()
        let i = 0
        for (i = 0; i < recurringDatesArray.length; i++) {
          forecast.push(
            {
              name: transaction.name,
              amount: parseFloat(transaction.amount),
              dueDate: recurringDatesArray[i],
              endDate: transaction.endDate,
              frequency: transaction.frequency,
              isPaid: false,
              type: transaction.type
            }
          )
        }
      } else if (transaction.frequency === 'Bi-weekly') {
          const biWeeklyRule = new RRule({
            freq: RRule.WEEKLY,
            dtstart: new Date(transaction.dueDate),
            interval: 2,
            until: new Date(Date.UTC(2021, 2, 1))
          })
          let recurringDatesArray = biWeeklyRule.all()
          let i = 0
          for (i = 0; i < recurringDatesArray.length; i++) {
            forecast.push(
              {
                name: transaction.name,
                amount: parseFloat(transaction.amount),
                dueDate: recurringDatesArray[i],
                endDate: transaction.endDate,
                frequency: transaction.frequency,
                isPaid: false,
                type: transaction.type
              }
            )
          }
        } else if (transaction.frequency === 'Weekly') {
            const weeklyRule = new RRule({
              freq: RRule.WEEKLY,
              dtstart: new Date(transaction.dueDate),
              interval: 1,
              until: new Date(Date.UTC(2021, 2, 1))
            })
            let recurringDatesArray = weeklyRule.all()
            let i = 0
            for (i = 0; i < recurringDatesArray.length; i++) {
              forecast.push(
                {
                  name: transaction.name,
                  amount: parseFloat(transaction.amount),
                  dueDate: recurringDatesArray[i],
                  endDate: transaction.endDate,
                  frequency: transaction.frequency,
                  isPaid: false,
                  type: transaction.type
                }
              )
            }
        } else if (transaction.frequency === 'Daily') {
            const dailyRule = new RRule({
              freq: RRule.DAILY,
              dtstart: new Date(transaction.dueDate),
              interval: 1,
              until: new Date(Date.UTC(2021, 2, 1))
            })
            let recurringDatesArray = dailyRule.all()
            let i = 0
            for (i = 0; i < recurringDatesArray.length; i++) {
              forecast.push(
                {
                  name: transaction.name,
                  amount: parseFloat(transaction.amount),
                  dueDate: recurringDatesArray[i],
                  endDate: transaction.endDate,
                  frequency: transaction.frequency,
                  isPaid: false,
                  type: transaction.type
                }
              )
            }
        } else if (transaction.frequency === 'Once') {
          forecast.push(
            {
              name: transaction.name,
              amount: parseFloat(transaction.amount),
              dueDate: new Date(transaction.dueDate),
              endDate: transaction.endDate,
              frequency: transaction.frequency,
              isPaid: false,
              type: transaction.type
            }
          )
        }
    })
    sortedForecast = forecast.sort((a, b) => a.dueDate - b.dueDate)
    this.setState({
      transactionList: sortedForecast
    })
  }
  componentDidMount() {

    this.calculateForecast()
  }
  componentWillUnmount() {
    localStorage.setItem('forecastList', JSON.stringify(this.state.transactionList))
    localStorage.setItem('balance', JSON.stringify(this.state.balance))
    this.setState({
      transactionList: JSON.parse(localStorage.getItem('transactionList'))
    })
  }
  render() {
    return (
      <div className="container">
        <h1>Forecast</h1>
        <h3>Balance: ${this.state.balance} &nbsp;
          <EditBalanceModal
          balance={this.state.balance}
          editBalanceInput={this.editBalanceInput}
          handleBalanceEditModalShow={() => this.setBalanceToEdit(this.state.balance)}
          handleBalanceEdit={this.handleBalanceEdit}
          handleBalanceEditSubmit={this.handleBalanceEditSubmit}
          />
        </h3> 
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
                {/* <th>Frequency</th> */}
                <th>Due Date</th>
                <th>End Date</th>
                <th>Type</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{
              this.state.transactionList.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.name}</td>
                <td>{(() => {
                  if (transaction.type === 'Bill') {
                    formattedTransactionAmount = parseFloat(transaction.amount) - (parseFloat(transaction.amount) * 2)
                    return (
                      parseFloat(formattedTransactionAmount).toFixed(2)
                    )
                  } else {
                    formattedTransactionAmount = parseFloat(transaction.amount)
                    return (
                      parseFloat(formattedTransactionAmount).toFixed(2)
                    )
                  }
                })()
                }</td>
                {/* <td>{transaction.frequency}</td> */}
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
                  {(() => {
                    if (index === 0) {
                      const startingBalance = parseFloat(this.state.balance)
                      forecastedBalance = (parseFloat(startingBalance) + parseFloat(formattedTransactionAmount))
                      return parseFloat(forecastedBalance).toFixed(2)
                    } else {
                      forecastedBalance = (parseFloat(forecastedBalance) + parseFloat(formattedTransactionAmount))
                      return parseFloat(forecastedBalance).toFixed(2)
                    }
                    })()
                  }
                </td>
                <td>
                  <Button 
                    index={index}
                    variant="info"
                    onClick={() => this.markAsPaid(index)}
                  >
                    Paid
                  </Button>
                </td>
              </tr>
              ))}
            </tbody>
          </Table>
      </div>
    )
  }
}

export default Forecast