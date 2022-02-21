import React from 'react'
import { Row, Col, Alert, Button, ButtonGroup } from '@dataesr/react-dsfr'

import MagicLink from 'components/base/MagicLink'

export default function Empty(props) {
  return (
    <Row gutters>
      <Col>
        <Alert title={`Vous n'avez pas encore ajouté de bilan`} />
        <br />
        <ButtonGroup isInlineFrom='md' align='right'>
          <MagicLink to={'/bilans/nouveau'}>
            <Button>Ajouter un bilan</Button>
          </MagicLink>
        </ButtonGroup>
      </Col>
    </Row>
  )
}
