import React from 'react'
import { Row, Col, Tile, TileBody } from '@dataesr/react-dsfr'

export default function Bilan(props) {
  return (
    <Row gutters>
      <Col>
        <Tile horizontal>
          <TileBody
            title={`${props.bilan.raisonSociale} - ${props.bilan.annee}`}
            linkHref={`/bilans/${props.bilan.id}`}
          ></TileBody>
        </Tile>
      </Col>
    </Row>
  )
}
