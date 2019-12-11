import React from 'react'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'

import Transaction from './Transaction'
import Forecast from './Forecast'


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
          />
        </Tab>
        <Tab 
        eventKey="transactions" 
        title="Transactions"
        unmountOnExit={true}
        >
          <Transaction/>
        </Tab>
      </Tabs>
    )
  }
}

export default TabView