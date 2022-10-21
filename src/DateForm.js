
import React from 'react'
import {Form, Container, Row, Col} from 'react-bootstrap'

class DateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fromYear: '2019',