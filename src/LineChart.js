import React from 'react'
import {Line} from 'react-chartjs-2'
import {Container} from 'react-bootstrap'

class LineChart extends React.Component {
  render() {
    let label = this.props.selectedAccount
    let labels = this.props.transactions.map(x => x.displayDate).reverse()
    let balance = this.props.transactions.map(x => x.balance).reverse()
    const data = {
      labels: l