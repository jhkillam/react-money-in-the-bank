import React from 'react'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
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
                <stop offset={this.gradientOffset()} stopColor="#f24236" stopOpacity={1}/>
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
