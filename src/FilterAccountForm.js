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
          onChange={props.