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
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: balance
        }
      ]
    }
    return (
      <Container className="chart">
        <div>
          <Line data={data} />
          <p>Balance History</p>
        </div>
      </Container>
    )
  }
}

export default LineChart
