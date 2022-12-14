import React from 'react'
import {Col, Form} from 'react-bootstrap'

const SortByDropdown = props => (
  <Col sm={4}>
    <Form>
      <Form.Label>Sort By:</Form.Label>
      <Form.Control as="select" name="sortBy" onChange={props.handleSortInput}>
        <option value="dateDes">Date Descending</option>
        <option value="dateAsc">Date Ascending</option>
        <option value="amountDes">Amount Descending</option>
        <option value="amountAsc">Amount Ascending</option