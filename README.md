# Grasshopper Front-end Technical Challenge

A dashboard that users will see upon login in that displays their account information.

### Features allow users to:

- Select 1 of 9 users to sign in as
  - all with different account information
- Switch between 1 of 9 users at any time
- Filter by account number
- Filter by keyword search
- Filter by date range
- View a line chart that shows the total balance history
- View all transactions that can be sorted by (ascending or descending):
  - date posted
  - transaction amount
  - category
  - transaction type
  - category

## Installation

Simply install by the command below:

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

```bash
npm start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```bash
npm test
```

Launches the test runner in the interactive watch mode.<br>

## Built Using

- React
- Axios
- Chart.js
  - react-chartjs-2
- Bootstrap
  - react-bootstrap
- Testing:
  - Enzyme
  - Chai

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Additional Features, Ideas and Considerations to Work On with Additional Time

- incorporating React Router if there were more pages than one dashboard view
- store transactions in a persistent database instead of storing all these transactions on local state
  - or storing it in a hash table for better access and scalability
  - if many transactions, only pull a number of transactions to display at a time that user can select for
  - create 