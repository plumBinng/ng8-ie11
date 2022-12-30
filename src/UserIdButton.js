import React from 'react'
import {Button, Container, Col, Row} from 'react-bootstrap'

class UserIdButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let userIds = new Array(9)
    for (let i = 0; i < userIds.length; i++) {
      userIds[i] = i + 1
    }
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={11} sm={8}>
            <div className="buttons">
              {userIds.map(userId => (
                <Button
                  variant="primary"
                  size="lg"
                  className="userIdButton"
                  key={userId}
                  onClick={this.props.handleClick}
                  value={userId}
                >
                  {userId}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default UserIdButton
