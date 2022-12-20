import React from 'react'
import {Button, Container, Col, Row} from 'react-bootstrap'

class UserIdButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let userIds = new Array(9)
    for (let i = 0; i < userIds.length; i