import React from 'react'
const DisplayRange = props => (
  <p className="displaying">
    Currently displaying transactions for{' '}
    <strong>{props.selectedAccount}</strong> from{' '}
    <strong>{props.filteredRangeF