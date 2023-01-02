
import React from 'react'
import {Container, Row, Col, Jumbotron} from 'react-bootstrap'

const Welcome = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={9}>
          <Jumbotron>
            <Container>
              <h1>
                Welcome to{' '}
                <span className="blueText">
                  <strong>Grasshopper</strong>
                </span>{' '}
                Bank!
              </h1>
              <p className="pleaseSignIn">
                Please sign in by selecting your <strong>user ID</strong> below:
              </p>
            </Container>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}

export default Welcome