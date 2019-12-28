import React from 'react'

import { RRule } from 'rrule'


import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const moment = require('moment')
const uuid = require('uuid/v1')

let data = []
let formattedTransactionAmount = 0
let chartBalance = 0

let forecast = []
let sortedForecast = JSON.parse(localStorage.getItem('forecastList')) || []
let forecastTransactionStartDate
let forecastTransactionEndDate
const forecastLimit = {
  endDate: new Date(),
  limit: 2
}
const defaultForecastStartDate = new Date()
const defaultForecastEndDate = new Date(forecastLimit.endDate.setFullYear(forecastLimit.endDate.getFullYear() + forecastLimit.limit))

class Chart extends React.Component {
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
  }
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/Lrffmzfc/';
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
  getForecast() {
    let forecast = JSON.parse(localStorage.getItem('forecastList')) || []
    // console.log('forecast on chart load', forecast)
    let localBalance = JSON.parse(localStorage.getItem('balance')) || 0
    chartBalance = parseFloat(localBalance)
    data = []
    forecast.forEach((forecastItem) => {
      this.checkForTransactionType(forecastItem)
      chartBalance = (chartBalance + formattedTransactionAmount)
      data.push({
        date: moment(forecastItem.dueDate).utc().format('MM/DD/YYYY'),
        Balance: parseFloat((chartBalance).toFixed(2)),
        Name: forecastItem.name
      })
    })
  }
  gradientOffset() {
    const dataMax = Math.max(...data.map((i) => i.Balance))
    const dataMin = Math.min(...data.map((i) => i.Balance))
    if (dataMax <= 0){
      return 0
    }
    else if (dataMin >= 0){
      return 1
    }
    else{
      return dataMax / (dataMax - dataMin);
    }
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
  render() {
    this.getForecast()
    return (
      <div className="container">
        <ResponsiveContainer
        aspect="1.5"
        width="95%"
      >
          <AreaChart
            data={data}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              payload={data}
            />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={this.gradientOffset()} stopColor="#17A2B8" stopOpacity={1}/>
                <stop offset={this.gradientOffset()} stopColor="#dc3545" stopOpacity={1}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="Balance" stroke="#000" fill="url(#splitColor)" />
            <Area type="monotone" dataKey="Name" stroke="#000" fill="#000" opacity="0" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart
