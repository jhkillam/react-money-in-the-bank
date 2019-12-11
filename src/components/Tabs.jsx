import React from 'react'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'

import Transaction from './Transaction'
import Forecast from './Forecast'


const TabView = () => {
  return (
    <Tabs defaultActiveKey="transactions">
      <Tab eventKey="forecast" title="Forecast">
        <Forecast/>
      </Tab>
      <Tab eventKey="transactions" title="Transactions">
        <Transaction/>
      </Tab>
    </Tabs>
  )
}

export default TabView