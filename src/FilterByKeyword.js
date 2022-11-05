import React from 'react'
import {Col, Form} from 'react-bootstrap'

const FilterByKeyword = props => (
  <Col sm={8}>
    <Form onSubmit={props.handleSearchSubmit}>
      <Form.Label>Filter Using Keyword: </Form.Label>
      <div className="searchBy">
        <Form.Control
          placeholder="Enter Description Search Term Here"
          type="text"
          value={props.searchTerm}
          onChange={props.handleSearchChange}
        ></Form.Control>
        <Col sm={2}>
          <Form.Control type="submit" value="Submit" />
        </Col>
      </div>
    </Form>
  </Col>
)

export default FilterByKeyword
