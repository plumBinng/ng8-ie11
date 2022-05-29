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
    this.sortByDateAsc = this.sortByDateAsc.bind(this)
    this.initializeAccounts = this.initializeAccounts.bind(this)
    this.accountsData = this.accountsData.bind(this)
    this.sortBy = this.sortBy.bind(this)
    this.handleAccountNumberInput = this.handleAccountNumberInput.bind(this)
    this.handleSortInput = this.handleSortInput.bind(this)
    this.handleSubmitTime = this.handleSubmitTime.bind(this)
    this.resetTransactions = this.resetTransactions.bind(this)
    this.convertUnixToDate = this.convertUnixToDate.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  getUserId(event) {
    this.setState({
      userId: event.target.value,
      noResults: false
    })
    if (this.state.filteredTransactions.length) {
      this.setState({
        filteredTransactions: []
      })
    }
    this.getTransactions(event.target.value)
  }

  async getTransactions(num) {
    let results = await axios.get(
      `http://tech-challenge.d3ucrjz23k.us-east-1.elasticbeanstalk.com/transactions/${num}`
    )
    this.sortByDateAsc(results.data)
    return results.data
  }

  sortByDateAsc(transactions) {
    let sorted = transactions.sort((a, b) => a.date - b.date)
    this.setState({
      allTransactions: sorted
    })
    this.initializeAccounts()
    return sorted
  }

  initializeAccounts() {
    let newAccounts = new Set()
    for (let i = this.state.allTransactions.length - 1; i >= 0; i--) {
      let transaction = this.state.allTransactions[i]
      if (
        transaction['type'] === 'Wire In' ||
        transaction['type'] === 'ACH In'
      ) {
        if (!newAccounts.has([transaction['beneficiary_account']])) {
          let accountNum = transaction['beneficiary_account']
          newAccounts.add(accountNum)
        }
      } else if (
        transaction['type'] === 'Wire Out' ||
        transaction['type'] === 'ACH Out'
      ) {
        if (!newAccounts.has([transaction['origin_account']])) {
          let accountNum = transaction['origin_account']
          newAccounts.add(accountNum)
        }
      } else {
        if (!newAccounts.has([transaction['beneficiary_account']])) {
          let accountNumBeneficiary = transaction['beneficiary_account']
          newAccounts.add(accountNumBeneficiary)
        }
        if (!newAccounts.has([transaction['origin_account']])) {
          let accountNumOrigin = transaction['origin_account']
          newAccounts.add(accountNumOrigin)
        }
      }
    }
    this.setState({accounts: newAccounts})
    this.accountsData()
    return newAccounts
  }

  accountsData(account) {
    let arr = []
    let newBalance = this.state.totalBalance
    for (let i = 0; i < this.state.allTransactions.length; i++) {
      let transaction = this.state.allTransactions[i]
      if (
        account === undefined ||
        account === 'all accounts' ||
        transaction.origin_account === account ||
        transaction.beneficiary_account === account
      ) {
        if (
          transaction['type'] === 'Wire In' ||
          transaction['type'] === 'ACH In'
        ) {
          newBalance = newBalance + transaction.amount
        } else if (
          transaction['type'] === 'Wire Out' ||
          transaction['type'] === 'ACH Out'
        ) {
          newBalance = newBalance - transaction.amount
          transaction.amount = -1 * transaction.amount
        } else {
          if (transaction.origin_account === account) {
            newBalance = newBalance - transaction.amount
            transaction.amount = -1 * transaction.amount
          } else if (transaction.beneficiary_account === account) {
            newBalance = newBalance + transaction.amount
          }
        }
        arr.push({
          id: transaction.id,
          balance: newBalance,
          date: transaction.date,
          amount: transaction.amount,
          type: transaction.type,
          description: transaction.description,
          origin_account: transaction.origin_account,
          beneficiary_account: transaction.beneficiary_account,
          category: transaction.category,
          displayDate: this.convertUnixToDate(transaction.date)
        })
      }
    }
    arr = arr.reverse()
    this.setState({transactions: arr, chartTransactions: arr})
    if (account !== undefined) {
      this.setState({
        selectedAccount: account
      })
    } else {
      this.setState({
        selectedAccount: 'all accounts'
      })
    }
    return arr
  }

  sortBy(event) {
    let copy
    if (this.state.filteredTransactions.length) {
      copy = JSON.parse(JSON.stringify([...this.state.filteredTransactions]))
    } else {
      copy = JSON.parse(JSON.stringify([...this.state.transactions]))
    }
    switch (event) {
      case 'dateAsc':
        copy.sort((a, b) => a.date - b.date)
        break
      case 'dateDes':
        copy.sort((a, b) => b.date - a.date)
        break
      case 'amountDes':
        copy.sort((a, b) => b.amount - a.amount)
        break
      case 'amountAsc':
        copy.sort((a, b) => a.amount - b.amount)
        break
      case 'typeDes':
        copy.sort((a, b) => b.type[0].charCodeAt() - a.type[0].charCodeAt())
        break
      case 'typeAsc':
        copy.sort((a, b) => a.type[0].charCodeAt() - b.type[0].charCodeAt())
        break
      case 'categoryDes':
        copy.sort(
          (a, b) => b.category[0].charCodeAt() - a.category[0].charCodeAt()
        )
        break
      case 'categoryAsc':
        copy.sort(
          (a, b) => a.category[0].charCodeAt() - b.category[0].charCodeAt()
        )
        break
      default:
        copy.sort((a, b) => a.date - b.date)
    }
    if (this.state.filteredTransactions.length) {
      this.setState({filteredTransactions: copy})
    } else {
      this.setState({transactions: copy})
    }
    return copy
  }

  handleAccountNumberInput(event) {
    let accountNumber
    if (event.target.value !== 'all accounts') {
      accountNumber = Number(event.target.value)
    }
    this.accountsData(accountNumber)
  }

  handleSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  handleSearchSubmit(event) {
    let searchMatches
    if (this.state.filteredTransactions.length) {
      searchMatches = this.state.filteredTransactions.filter(transaction =>
        transaction.description.includes(this.state.searchTerm)
      )
      this.setState({
        filteredTransa