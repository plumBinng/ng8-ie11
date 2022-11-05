import React from 'react'
import {Col, Form} from 'react-bootstrap'

const FilterByKeyword = props => (
  <Col sm={8}>
    <Form onSubmit={props.handleSearchSubmit}>
      <Form.Label>Filter Using Keyword: </Form.Label>
      <div className="searchBy">
        <Form.Control
          placeholder="Enter Description Search Ter