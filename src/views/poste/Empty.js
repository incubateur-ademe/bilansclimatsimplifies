import React from 'react'
import { Row, Col, Alert } from '@dataesr/react-dsfr'

export default function Empty(props) {
  return (
    <Row gutters>
      <Col>
        <Alert
          title={`Vous n'avez pas encore ajouté de source d'émission pour ce poste`}
        />
        <br />
      </Col>
    </Row>
  )
}
