import React from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import Navbar from './Navbar'

export default (props) => (
  <div>
    <Navbar />
    <Container fluid>
      <Row>
        <Col>
          <Jumbotron>
            <h1 className="display-3">Skill Tracker!</h1>
            <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="m-y-2" />
            <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
            <p className="lead">
              <Button color="primary">Learn More</Button>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  </div>
)
