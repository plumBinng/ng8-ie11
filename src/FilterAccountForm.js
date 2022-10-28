import React from 'react'
import {Col, Form} from 'react-bootstrap'

const FilterAccountForm = props => {
  return (
    <Col sm={4}>
      <Form>
        <Form.Label>Filter by Account: </Form.Label>
        <Form.Control
          as="select"
          name="accountNumber"
          onChange={props.handleAccountNumberInput}
        >
          {['Choose An Account']
            .concat([...props.accounts])
            .concat(['all accounts'])
            .map(account => (
              <option key={Math.random()} value={account}>
                {account}
              </option>
            ))}
        </Form.Control>
      </Form>
    </Col>
  )
}

export default FilterAccountForm
