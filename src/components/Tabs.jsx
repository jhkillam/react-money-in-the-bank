import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'

import Transaction from './Transaction'


const TabView = () => {
  return (
    <Tabs defaultActiveKey="transactions">
      <Tab eventKey="forecast" title="Forecast">
        <h2>Forecast</h2>
      </Tab>
      <Tab eventKey="transactions" title="Transactions">
        <Transaction/>
      </Tab>
    </Tabs>
  )
}

export default TabView