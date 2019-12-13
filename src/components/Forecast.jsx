import React from 'react'

import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'

import { RRule } from 'rrule'

const moment = require('moment')

let forecast = []
let sortedForecast = []

class Forecast extends React.Component {
  constructor(props) {
    let localTransactionList = JSON.parse(localStorage.getItem('transactionList'))
    super(props)
    this.state = {
      transactionList: localTransactionList
    }
  }
  componentDidMount() {
    console.log('forecast component mounted')
    console.log('mount', this.state.transactionList)
    forecast = []
    sortedForecast = []
    // this.setState({
    //   transactionList: JSON.parse(localStorage.getItem('transactionList'))
    // })
    // this.setState({
    //   myDate: this.state.transactionList[0].dueDate
    // })
    
    this.state.transactionList.map((transaction) => {
      if (transaction.frequency === 'Monthly') {
        const monthlyRule = new RRule({
          freq: RRule.MONTHLY,
          dtstart: new Date(transaction.dueDate),
          interval: 1,
          until: new Date(Date.UTC(2021, 2, 1))
        })
        let recurringDatesArray = monthlyRule.all()
        let i = 0
        for (i = 0; i < recurringDatesArray.length; i++) {
          forecast.push(
            {
              name: transaction.name,
              amount: transaction.amount,
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
                amount: transaction.amount,
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
                  amount: transaction.amount,
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
                  amount: transaction.amount,
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
              amount: transaction.amount,
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
    console.log('sorted forecast', sortedForecast)
    this.setState({
      transactionList: sortedForecast
    })
  }
  componentDidUpdate(prevProps) {
    if (this.props.transactionList !== prevProps.transactionList) {
      console.log('winning?')
    }
  }
  // componentDidUpdate() {
  //   console.log('forecast component did update')
  //   console.log(this.state.transactionList)
  //   this.state.transactionList.map((transaction) => {
  //     if (transaction.frequency === 'Monthly') {
  //       const monthlyRule = new RRule({
  //         freq: RRule.MONTHLY,
  //         dtstart: new Date(transaction.dueDate),
  //         interval: 1,
  //         until: new Date(Date.UTC(2021, 2, 1))
  //       })
  //       let recurringDatesArray = monthlyRule.all()
  //       let i = 0
  //       for (i = 0; i < recurringDatesArray.length; i++) {
  //         forecast.push(
  //           {
  //             name: transaction.name,
  //             amount: transaction.amount,
  //             dueDate: recurringDatesArray[i],
  //             endDate: transaction.endDate,
  //             frequency: transaction.frequency,
  //             isPaid: false,
  //             type: transaction.type
  //           }
  //         )
  //       }
  //     } else if (transaction.frequency === 'Bi-weekly') {
  //         const biWeeklyRule = new RRule({
  //           freq: RRule.WEEKLY,
  //           dtstart: new Date(transaction.dueDate),
  //           interval: 2,
  //           until: new Date(Date.UTC(2021, 2, 1))
  //         })
  //         let recurringDatesArray = biWeeklyRule.all()
  //         let i = 0
  //         for (i = 0; i < recurringDatesArray.length; i++) {
  //           forecast.push(
  //             {
  //               name: transaction.name,
  //               amount: transaction.amount,
  //               dueDate: recurringDatesArray[i],
  //               endDate: transaction.endDate,
  //               frequency: transaction.frequency,
  //               isPaid: false,
  //               type: transaction.type
  //             }
  //           )
  //         }
  //       } else if (transaction.frequency === 'Weekly') {
  //           const weeklyRule = new RRule({
  //             freq: RRule.WEEKLY,
  //             dtstart: new Date(transaction.dueDate),
  //             interval: 1,
  //             until: new Date(Date.UTC(2021, 2, 1))
  //           })
  //           let recurringDatesArray = weeklyRule.all()
  //           let i = 0
  //           for (i = 0; i < recurringDatesArray.length; i++) {
  //             forecast.push(
  //               {
  //                 name: transaction.name,
  //                 amount: transaction.amount,
  //                 dueDate: recurringDatesArray[i],
  //                 endDate: transaction.endDate,
  //                 frequency: transaction.frequency,
  //                 isPaid: false,
  //                 type: transaction.type
  //               }
  //             )
  //           }
  //       } else if (transaction.frequency === 'Daily') {
  //           const dailyRule = new RRule({
  //             freq: RRule.DAILY,
  //             dtstart: new Date(transaction.dueDate),
  //             interval: 1,
  //             until: new Date(Date.UTC(2021, 2, 1))
  //           })
  //           let recurringDatesArray = dailyRule.all()
  //           let i = 0
  //           for (i = 0; i < recurringDatesArray.length; i++) {
  //             forecast.push(
  //               {
  //                 name: transaction.name,
  //                 amount: transaction.amount,
  //                 dueDate: recurringDatesArray[i],
  //                 endDate: transaction.endDate,
  //                 frequency: transaction.frequency,
  //                 isPaid: false,
  //                 type: transaction.type
  //               }
  //             )
  //           }
  //       } else if (transaction.frequency === 'Once') {
  //         console.log('once~~~~~~~~~~~~~~', transaction.name)
  //         forecast.push(
  //           {
  //             name: transaction.name,
  //             amount: transaction.amount,
  //             dueDate: new Date(transaction.dueDate),
  //             endDate: transaction.endDate,
  //             frequency: transaction.frequency,
  //             isPaid: false,
  //             type: transaction.type
  //           }
  //         )
  //       }
  //   })
  //   const sortedForecast = forecast.sort((a, b) => a.dueDate - b.dueDate)
  //   console.log('sorted forecast', sortedForecast)
  // }
  componentWillUnmount() {
    this.setState({
      transactionList: JSON.parse(localStorage.getItem('transactionList'))
    })
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