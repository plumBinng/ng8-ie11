
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