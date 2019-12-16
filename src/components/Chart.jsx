import React from 'react'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const moment = require('moment')

let data = []
let formattedTransactionAmount = 0
let chartBalance = 0

class Chart extends React.Component {
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
  getForecast() {
    let forecast = JSON.parse(localStorage.getItem('forecastList')) || []
    let localBalance = JSON.parse(localStorage.getItem('balance')) || 0
    console.log(localBalance)
    chartBalance = parseFloat(localBalance)
    data = []
    forecast.map((forecastItem) => {
      // console.log(forecastItem)
      this.checkForTransactionType(forecastItem)
      chartBalance = (chartBalance + formattedTransactionAmount)
      data.push({
        date: moment(forecastItem.dueDate).utc().format('MM/DD/YYYY'),
        balance: ( chartBalance - formattedTransactionAmount)
      })
    })
  }
  render() {
    console.log(data)
    this.getForecast()
    return (
      <AreaChart
        width={2000}
        height={400}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="balance" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );
  }
}

export default Chart
