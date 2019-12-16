import React from 'react'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'

import Transaction from './Transaction'
import Forecast from './Forecast'
import Chart from './Chart'


class TabView extends React.Component {

  render() {
    return (
      <Tabs 
      defaultActiveKey="forecast"
      >
        <Tab 
        eventKey="forecast" 
        title="Forecast"
        unmountOnExit={true}
        >
          <Forecast
            transactionList={localStorage.getItem('transactionList')}
          />
        </Tab>
        <Tab 
        eventKey="transactions" 
        title="Transactions"
        unmountOnExit={true}
        >
          <Transaction/>
        </Tab>
        <Tab
        eventKey="chart"
        title="Chart"
        unmountOnExit={true}
        >
          <Chart/>
        </Tab>
      </Tabs>
    )
  }
}

export default TabView