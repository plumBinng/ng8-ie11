
import React from 'react'
const DisplayAll = props => (
  <p className="displaying">
    Currently displaying all transactions for{' '}
    <strong>{props.selectedAccount}</strong>
  </p>
)

export default DisplayAll