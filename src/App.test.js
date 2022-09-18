
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  Navbar,
  Welcome,
  NotYou,
  UserIdButton,
  DateForm,
  FilterAccountForm,
  FilterByKeyword,
  SortByDropdown,
  LineChart,
  ResetButton,
  NoResults,
  DisplayRange,
  DisplayAll,
  Transactions,
  ArrowUp,
  ArrowDown
} from './Components'

import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {expect} from 'chai'

const adapter = new Adapter()
Enzyme.configure({adapter})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe('<App /> component', () => {
  it('renders', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.exists()).to.equal(true)
  })

  describe('API response', () => {
    it('hits test API', async () => {
      const wrapper = shallow(<App />)
      const data = await wrapper.instance().getTransactions(3)
      expect(data.length).to.equal(3)
    })
  })

  describe('getting initial transactions from API and sorting', () => {
    it('sorts transactions in descending order', () => {
      const wrapper = shallow(<App />)
      const testTransactions = [{date: 10}, {date: 50}, {date: 1}]
      const expectedSortedTestTransactions = [{date: 1}, {date: 10}, {date: 50}]
      const data = wrapper.instance().sortByDateAsc(testTransactions)
      expect(data[0].date).to.equal(expectedSortedTestTransactions[0].date)
      expect(data[1].date).to.equal(expectedSortedTestTransactions[1].date)
      expect(data[2].date).to.equal(expectedSortedTestTransactions[2].date)
    })
    it('populates state with sorted transactions', async () => {
      const wrapper = shallow(<App />)
      const testTransactions = [{date: 10}, {date: 50}, {date: 1}]
      const expectedSortedTestTransactions = [{date: 1}, {date: 10}, {date: 50}]
      wrapper.instance().sortByDateAsc(testTransactions)
      expect(wrapper.state().allTransactions[0].date).to.equal(
        expectedSortedTestTransactions[0].date
      )
      expect(wrapper.state().allTransactions[1].date).to.equal(
        expectedSortedTestTransactions[1].date
      )
      expect(wrapper.state().allTransactions[2].date).to.equal(
        expectedSortedTestTransactions[2].date
      )
    })
  })

  describe('populating account numbers', () => {
    it('populates state with account numbers', async () => {
      const wrapper = shallow(<App />)
      const testTransactions = [
        {
          id: 3,
          category: 'supplies',
          type: 'ACH In',
          origin_account: 5432,
          beneficiary_account: 2345,
          amount: 879,
          description: 'chairs',
          initiator_id: 3,
          approver_id: 2,
          company_id: 1,
          date: 1557187200000
        },
        {
          id: 5,
          category: 'maintenance',
          type: 'Internal Transfer',
          origin_account: 1234,
          beneficiary_account: 2345,
          amount: 145,
          description: 'paper towels',
          initiator_id: 3,
          approver_id: 1,
          company_id: 1,
          date: 1552089600000
        },
        {
          id: 25,
          category: 'maintenance',
          type: 'ACH In',
          origin_account: 8542,
          beneficiary_account: 2345,
          amount: 134,
          description: 'paper towels',
          initiator_id: 3,
          approver_id: 1,
          company_id: 1,
          date: 1554681600000
        }
      ]
      wrapper.setState({allTransactions: testTransactions})
      let accounts = wrapper.instance().initializeAccounts()
      accounts = Array.from(accounts).sort()
      expect(accounts[0]).to.equal(1234)
      expect(accounts[1]).to.equal(2345)
      let accountsStateArray = Array.from(wrapper.state().accounts).sort()
      expect(accountsStateArray[0]).to.equal(1234)
      expect(accountsStateArray[1]).to.equal(2345)
    })
  })

  describe('getting account data', () => {
    it('populates with account data for all accounts', () => {
      const wrapper = shallow(<App />)
      const testTransactions = [
        {
          id: 7,
          category: 'utilities',
          type: 'Wire Out',
          origin_account: 3456,
          beneficiary_account: 9453,
          amount: 123,
          description: 'electric bill',
          initiator_id: 5,
          approver_id: 4,
          company_id: 2,
          date: 1551571200000
        },
        {
          id: 8,
          category: 'supplies',
          type: 'ACH In',
          origin_account: 987,
          beneficiary_account: 4567,
          amount: 344,
          description: 'paper towels',
          initiator_id: 6,
          approver_id: 5,
          company_id: 2,
          date: 1550275200000
        },
        {
          id: 10,
          category: 'maintenance',
          type: 'Internal Transfer',
          origin_account: 4567,
          beneficiary_account: 3456,
          amount: 234,
          description: 'paper towels',
          initiator_id: 5,
          approver_id: 6,
          company_id: 2,
          date: 1547683200000
        },
        {
          id: 29,
          category: 'supplies',
          type: 'ACH In',
          origin_account: 841,
          beneficiary_account: 4567,
          amount: 123,
          description: 'paper towels',
          initiator_id: 6,
          approver_id: 5,
          company_id: 2,
          date: 1546732800000
        },
        {
          id: 40,
          category: 'maintenance',
          type: 'Internal Transfer',
          origin_account: 4567,
          beneficiary_account: 3456,
          amount: 342,
          description: 'paper towels',
          initiator_id: 5,
          approver_id: 6,
          company_id: 2,
          date: 1551830400000
        }
      ]
      testTransactions.sort((a, b) => a.date - b.date)
      wrapper.setState({allTransactions: testTransactions})
      let transactions = wrapper.instance().accountsData()
      expect(transactions[0].balance).to.equal(344)
      expect(transactions[4].balance).to.equal(123)
    })

    it('populates with account data for specific account', () => {
      const wrapper = shallow(<App />)
      const testTransactions = [
        {
          id: 7,
          category: 'utilities',
          type: 'Wire Out',
          origin_account: 3456,
          beneficiary_account: 9453,
          amount: 123,
          description: 'electric bill',
          initiator_id: 5,
          approver_id: 4,
          company_id: 2,
          date: 1551571200000
        },
        {
          id: 8,
          category: 'supplies',
          type: 'ACH In',
          origin_account: 987,
          beneficiary_account: 4567,
          amount: 344,
          description: 'paper towels',
          initiator_id: 6,
          approver_id: 5,
          company_id: 2,
          date: 1550275200000
        },
        {
          id: 10,
          category: 'maintenance',
          type: 'Internal Transfer',
          origin_account: 4567,
          beneficiary_account: 3456,
          amount: 234,
          description: 'paper towels',
          initiator_id: 5,
          approver_id: 6,
          company_id: 2,
          date: 1547683200000
        },
        {
          id: 29,
          category: 'supplies',
          type: 'ACH In',
          origin_account: 841,
          beneficiary_account: 4567,
          amount: 123,
          description: 'paper towels',
          initiator_id: 6,
          approver_id: 5,
          company_id: 2,
          date: 1546732800000
        },
        {
          id: 40,
          category: 'maintenance',
          type: 'Internal Transfer',
          origin_account: 4567,
          beneficiary_account: 3456,
          amount: 342,
          description: 'paper towels',
          initiator_id: 5,
          approver_id: 6,
          company_id: 2,
          date: 1551830400000
        }
      ]

      testTransactions.sort((a, b) => a.date - b.date)
      wrapper.setState({allTransactions: testTransactions})
      let transactions = wrapper.instance().accountsData(3456)
      expect(transactions[0].balance).to.equal(453)
      expect(transactions[2].balance).to.equal(234)
    })
  })
  describe('searches by keyword', () => {
    it('returns matches for input keyword', () => {
      const wrapper = shallow(<App />)
      const testTransactions = [
        {description: 'groceries'},
        {description: 'gym membership'},
        {description: 'electric bill'}
      ]
      wrapper.setState({transactions: testTransactions, searchTerm: 'gym'})
      const fakeEvent = {preventDefault: () => {}}
      let searchMatches = wrapper.instance().handleSearchSubmit(fakeEvent)
      expect(searchMatches[0].description).to.equal('gym membership')
    })
    it('is an empty array with no matches', () => {
      const wrapper = shallow(<App />)
      const testTransactions = [
        {description: 'groceries'},
        {description: 'gym membership'},
        {description: 'electric bill'}
      ]
      wrapper.setState({transactions: testTransactions, searchTerm: 'internet'})
      const fakeEvent = {preventDefault: () => {}}
      let searchMatches = wrapper.instance().handleSearchSubmit(fakeEvent)
      expect(searchMatches.length).to.equal(0)
    })
    it('resets when clicked on view all history', () => {
      const wrapper = shallow(<App />)
      wrapper.setState({filteredTransactions: ['searchMatch1', 'searchMatch2']})
      const fakeEvent = {
        preventDefault: () => {}
      }
      let resetToAllTransactions = wrapper
        .instance()
        .resetTransactions(fakeEvent)
      expect(resetToAllTransactions.length).to.equal(0)
    })
  })

  describe('sorts transactions by various criteria', () => {
    describe('sorts by date', () => {
      it('sorts by date descending', () => {
        const wrapper = shallow(<App />)
        const testTransactions = [{date: 100}, {date: 50}, {date: 300}]
        wrapper.setState({transactions: testTransactions})
        let transactions = wrapper.instance().sortBy('dateDes')
        expect(transactions[0].date).to.equal(300)
        expect(transactions[2].date).to.equal(50)
      })
      it('sorts by date ascending', () => {
        const wrapper = shallow(<App />)
        const testTransactions = [{date: 100}, {date: 50}, {date: 300}]
        wrapper.setState({transactions: testTransactions})
        let transactions = wrapper.instance().sortBy('dateAsc')
        expect(transactions[0].date).to.equal(50)
        expect(transactions[2].date).to.equal(300)
      })
    })
    describe('sorts by amount', () => {