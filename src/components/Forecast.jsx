import React from 'react'

import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'

import { RRule, RRuleSet, rrulestr } from 'rrule'

const moment = require('moment')

class Forecast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myDate: "",
      transactionList: []
    }
  }
  componentDidMount() {
    console.log('forecast component mounted')
    this.setState({
      transactionList: JSON.parse(localStorage.getItem('transactionList'))
    })
    setTimeout(() => {
      this.setState({
        myDate: this.state.transactionList[0].dueDate
      })
      const monthlyRule = new RRule({
        freq: RRule.MONTHLY,
        dtstart: new Date(this.state.myDate),
        interval: 1,
        until: new Date(Date.UTC(2025, 2, 31))
      })
      console.log('myDate', this.state.myDate)
      console.log('rrule', monthlyRule.all())
      }, 500);
  }
  componentWillUnmount() {
    console.log('forecast component unmounted')
  }
  render() {
    return (
      <div className="container">
        <h1>Forecast</h1>
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
                <th>Balance</th>
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
              </tr>
              ))}
            </tbody>
          </Table>
      </div>
    )
  }
}

export default Forecast