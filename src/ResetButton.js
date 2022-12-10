import React from 'react'
import {Button} from 'react-bootstrap'

const ResetButton = props => {
  return (
    <Button
      className="allTransactionsButton"
      variant="outline-primary"
      onClick={props.resetTransactions}
    >
      Reset/See All Transactions
    </Button>
  )
}

export default ResetButton
