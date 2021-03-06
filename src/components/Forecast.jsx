import React from 'react'

import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'

import { RRule } from 'rrule'
import { cloneDeep } from 'lodash'

import EditBalanceModal from './EditBalanceModal'

const moment = require('moment')
const uuid = require('uuid/v1')

let forecast = []
let sortedForecast = JSON.parse(localStorage.getItem('forecastList')) || []
let forecastedBalance = 0
let formattedTransactionAmount = 0
let forecastTransactionStartDate
let forecastTransactionEndDate
const forecastLimit = {
  endDate: new Date(),
  limit: 2
}
const defaultForecastStartDate = new Date()
const defaultForecastEndDate = new Date(forecastLimit.endDate.setFullYear(forecastLimit.endDate.getFullYear() + forecastLimit.limit))

class Forecast extends React.Component {
  constructor(props) {
    let localTransactionList = JSON.parse(localStorage.getItem('transactionList'))
    let localBalance = JSON.parse(localStorage.getItem('balance')) || 0
    let localPaidItems = JSON.parse(localStorage.getItem('paidItemsList')) || []
    super(props)
    this.state = {
      transactionList: localTransactionList, 
      balance: localBalance,
      paidItemsList: localPaidItems,
      forecastList: sortedForecast
    }
    this.editBalanceInput = React.createRef()
  }
  handleBalanceEditSubmit = e => {
    let editedBalance = this.editBalanceInput.current.value
    localStorage.setItem('balance', JSON.stringify(editedBalance))
    e.preventDefault()
    this.setState({ balance: editedBalance })
  }
  markAsPaid(index) {
    const currentForecastList = [...this.state.transactionList]
    const newForecastList = cloneDeep(currentForecastList)
    const currentPaidItems = [...this.state.paidItemsList]
    const newPaidItemsList = cloneDeep(currentPaidItems)
    let newForecastedBalance = parseFloat(this.state.balance) + this.checkForTransactionType(this.state.transactionList[index])
    newForecastedBalance = parseFloat(newForecastedBalance).toFixed(2)
    newForecastList[index].isPaid = true
    newPaidItemsList.push(newForecastList[index])
    newForecastList.splice(index, 1)
    // console.log('spliced! new forecast list', newForecastList)
    localStorage.setItem('forecastList', JSON.stringify(newForecastList))
    localStorage.setItem('balance', JSON.stringify(newForecastedBalance))
    localStorage.setItem('paidItemsList', JSON.stringify(newPaidItemsList))
    this.setState({
      transactionList: newForecastList,
      balance: newForecastedBalance, 
      paidItemsList: newPaidItemsList, 
      forecastList: newForecastList
    })
  }
  checkForTransactionType(transaction) {
    if (transaction.type === 'Expense') {
      formattedTransactionAmount = parseFloat(transaction.amount) - (parseFloat(transaction.amount) * 2)
      return (
        parseFloat(formattedTransactionAmount)
      )
    } else {
      formattedTransactionAmount = parseFloat(transaction.amount)
      return (
        parseFloat(formattedTransactionAmount)
      )
    }
  }
  calculateForecast() {
    forecast = []
    // TODO: WORK ON HANLDING TRANSACTION LIST UPDATES AND MARK AS PAID
    // let transactionListCopy = cloneDeep(this.state.transactionList)
    // let transactionListToUpdateForecast = cloneDeep(transactionListCopy)
    // let transactionListCopyLength = transactionListCopy.length
    // let indicesToSplice = []
    // console.log('state.transactionList', this.state.transactionList)
    // console.log('transactionListCopy', transactionListCopy)
    // console.log('transactionListToUpdateForecast', transactionListToUpdateForecast)
    // for (let index = 0; index < transactionListCopyLength; index++) {
    //   let transactionIndexToCheck = transactionListCopy[index].transactionId 
    //   let checkForSplice = sortedForecast.findIndex(x => (x.transactionId === transactionIndexToCheck))
    //   if (checkForSplice !== -1) {
    //     indicesToSplice.push(index)
    //   }
    // }
    // console.log('to splice', indicesToSplice.length)
    // for (let index = indicesToSplice.length -1 ; index > -1; index--) {
    //   console.log('splice index', index)
    //   transactionListToUpdateForecast.splice(indicesToSplice[index], 1)
    //   console.log("updated spliced list for forecast", transactionListToUpdateForecast)
    // }
    this.state.transactionList.forEach((transaction) => {
      // these if-else statements check if there is an invalid start or end date
      // TODO: IMPLEMENT FORM VALIDATION
      if (transaction.endDate === "") {
        forecastTransactionEndDate = defaultForecastEndDate
      } else (
        forecastTransactionEndDate = new Date(transaction.endDate)
      )
      if (transaction.dueDate === "") {
        forecastTransactionStartDate = defaultForecastStartDate
      } else {
        forecastTransactionStartDate = new Date(transaction.dueDate)
      }
      // END OF DATE VALIDATION
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      
      if (transaction.frequency === 'Monthly') {
        const monthlyRule = new RRule({
          freq: RRule.MONTHLY,
          dtstart: forecastTransactionStartDate,
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
              type: transaction.type,
              transactionId: transaction.transactionId,
              forecastId: uuid()
            }
          )
        }
      } else if (transaction.frequency === 'Bi-weekly') {
          const biWeeklyRule = new RRule({
            freq: RRule.WEEKLY,
            dtstart: forecastTransactionStartDate,
            interval: 2,
            until: forecastTransactionEndDate
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
                type: transaction.type,
                transactionId: transaction.transactionId,
                forecastId: uuid()
              }
            )
          }
        } else if (transaction.frequency === 'Weekly') {
            const weeklyRule = new RRule({
              freq: RRule.WEEKLY,
              dtstart: forecastTransactionStartDate,
              interval: 1,
              until: forecastTransactionEndDate
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
                  type: transaction.type,
                  transactionId: transaction.transactionId,
                  forecastId: uuid()
                }
              )
            }
        } else if (transaction.frequency === 'Daily') {
            const dailyRule = new RRule({
              freq: RRule.DAILY,
              dtstart: forecastTransactionStartDate,
              interval: 1,
              until: forecastTransactionEndDate
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
                  type: transaction.type,
                  transactionId: transaction.transactionId,
                  forecastId: uuid()
                }
              )
            }
        } else if (transaction.frequency === 'Once') {
          forecast.push(
            {
              name: transaction.name,
              amount: parseFloat(transaction.amount),
              dueDate: forecastTransactionStartDate,
              endDate: transaction.endDate,
              frequency: transaction.frequency,
              isPaid: false,
              type: transaction.type,
              transactionId: transaction.transactionId,
              forecastId: uuid()
            }
          )
        }
    })
    sortedForecast = forecast.sort((a, b) => a.dueDate - b.dueDate)
    localStorage.setItem('forecastList', JSON.stringify(sortedForecast))
    this.setState({
      transactionList: sortedForecast
    })
  }
  componentDidMount() {
    if (this.state.transactionList) {
      if (this.state.transactionList.length === 0) {
        // console.log('setting trlist and forecastlist to null')
        this.setState({
          transactionList: null,
          forecastList: null
        })
      } else {
        this.calculateForecast()
      }
    } else {
      // console.log('setting trlist and forecastlist to null')
      this.setState({
        transactionList: null, 
        forecastList: null
      })
    }
  }
  componentWillUnmount() {
    localStorage.setItem('balance', JSON.stringify(this.state.balance))
    localStorage.setItem('forecastList', JSON.stringify(this.state.forecastList))
    // console.log('forecast unmounting, forecast saved to localstorage', this.state.forecastList)
    if (this.state.transactionList) {
      this.setState({
        transactionList: JSON.parse(localStorage.getItem('transactionList'))
      })
    }
    if (this.state.paidItemsList) {
      localStorage.setItem('paidItemsList', JSON.stringify(this.state.paidItemsList))
    }
  }
  drawForecastTable() {
    if (this.state.transactionList) {
      return (
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
              {/* <th>Frequency</th> */}
              <th>Due Date</th>
              {/* <th>End Date</th>
              <th>Type</th> */}
              <th>Balance</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.transactionList.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.name}</td>
              <td>
                {(() => {
                  if (transaction.type === "Expense") {
                    return (
                      <span className="expense">{this.checkForTransactionType(transaction).toFixed(2)}</span>
                    )
                  } else {
                    return (
                      <span className="income">{this.checkForTransactionType(transaction).toFixed(2)}</span>
                    )
                  }
                })()}
              </td>
              <td>{moment(transaction.dueDate).utc().format('MM/DD/YYYY')}</td>
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
              {/* <td>
                <Button 
                  index={index}
                  variant="info"
                  onClick={() => this.markAsPaid(index)}
                  size="sm"
                >
                  Paid
                </Button>
              </td> */}
            </tr>
          ))}
          </tbody>
        </Table>
      )
    } else {
      return (
        <p>Looks like you have no transactions saved. Go create some on the transactions tab.</p>
      )
    }
  }
  render() {
    return (
      <div className="container">
        <h1>Forecast</h1>
        <h3>Balance: ${(this.state.balance)} &nbsp;
          <EditBalanceModal
          balance={this.state.balance}
          editBalanceInput={this.editBalanceInput}
          handleBalanceEditModalShow={() => this.setBalanceToEdit(this.state.balance)}
          handleBalanceEdit={this.handleBalanceEdit}
          handleBalanceEditSubmit={this.handleBalanceEditSubmit}
          />
        </h3> 
        {this.drawForecastTable()}
      </div>
    )
  }
}

export default Forecast