
import React from 'react'
import {ArrowUp, ArrowDown} from './Components'
import {Container, Table} from 'react-bootstrap'

const Transactions = props => (
  <div>
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date Posted</th>
            <th>Description</th>
            <th>Category</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Total Balance</th>
          </tr>
        </thead>
        <tbody>
          {props.allTransactions.map(transaction => (
            <tr key={transaction.id} className="transaction">
              <td>{transaction.displayDate}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>
                {transaction.type}{' '}
                {transaction.amount > 0 ? <ArrowUp /> : <ArrowDown />}
              </td>
              <td>${transaction.amount}.00</td>
              <td>${transaction.balance}.00</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  </div>
)

export default Transactions