import React from 'react'
import {Line} from 'react-chartjs-2'
import {Container} from 'react-bootstrap'

class LineChart extends React.Component {
  render() {
    let label = this.props.selectedAccount
    let labels = this.props.transactions.map(x => x.displayDate).reverse()
    let balance = this.props.transactions.map(x => x.balance).reverse()
    const data = {
      labels: labels,
      datasets: [
        {
          label: label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundCol