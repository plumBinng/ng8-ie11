import React from 'react'
import axios from 'axios'
import {
  Navbar,
  Welcome,
  NotYou,
  DateForm,
  UserIdButton,
  FilterAccountForm,
  FilterByKeyword,
  SortByDropdown,
  LineChart,
  ResetButton,
  NoResults,
  DisplayRange,
  DisplayAll,
  Transactions
} from './Components'

import {Container, Row} from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0,
      allTransactions: [],
      accounts: new Set(),
      selectedAccount: 'all accounts',
      transactions: [],
      totalBalance: 0,
      searchTerm: '',
      filteredTransactions: [],
      filteredRangeFrom: '',
      filteredRangeTo: '',
      noResults: false,
      chartTransactions: []
    }
    this.getUserId = this.getUserId.bind(this)
    this.getTransactions = this.getTransactions.bind(this)
    this.sortBy