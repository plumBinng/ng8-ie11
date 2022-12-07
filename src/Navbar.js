import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

const NavBar = props => {
  return (
    <div className="navBar">
      <Navbar bg="light">
        <Navbar.Brand onClick={props.handleBrandClick} href="/">
          <span className="blueText">
            <str