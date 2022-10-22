
import React from 'react'
import {Form, Container, Row, Col} from 'react-bootstrap'

class DateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fromYear: '2019',
      toYear: '2019',
      fromMonth: '01',
      toMonth: '01',
      fromDay: '01',
      toDay: '01'
    }
    this.handleDateChangeFrom = this.handleDateChangeFrom.bind(this)
    this.handleDateChangeTo = this.handleDateChangeTo.bind(this)
    this.handleMonthChangeFrom = this.handleMonthChangeFrom.bind(this)
    this.handleMonthChangeTo = this.handleMonthChangeTo.bind(this)
    this.handleYearChangeFrom = this.handleYearChangeFrom.bind(this)
    this.handleYearChangeTo = this.handleYearChangeTo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleYearChangeFrom(event) {
    this.setState({
      fromYear: event.target.value
    })
  }

  handleYearChangeTo(event) {
    this.setState({
      toYear: event.target.value
    })
  }

  handleMonthChangeFrom(event) {
    this.setState({
      fromMonth: event.target.value
    })
  }

  handleMonthChangeTo(event) {
    this.setState({
      toMonth: event.target.value
    })
  }

  handleDateChangeFrom(event) {
    let day = event.target.value
    if (day.length < 2) {
      day = '0' + day
    }
    this.setState({
      fromDay: day
    })
  }

  handleDateChangeTo(event) {
    let day = event.target.value
    if (day.length < 2) {
      day = '0' + day