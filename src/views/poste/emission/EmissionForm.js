import React from 'react'
import { Row, Col } from '@dataesr/react-dsfr'

import TypeSelector from './emissionForm/TypeSelector'
import LocationSelector from './emissionForm/LocationSelector'
import UnitSelector from './emissionForm/UnitSelector'
import ValueInput from './emissionForm/ValueInput'
import NoteInput from './emissionForm/NoteInput'

export default function EmissionForm(props) {
  return (
    <>
      <Row gutters>
        <Col n='6'>
          <TypeSelector
            value={props.type}
            onChange={(type) => {
              props.setType(type)
              props.setLocalisation(null)
            }}
            poste={props.poste}
          />
        </Col>
      </Row>
      <Row gutters>
        <Col n='6'>
          <LocationSelector
            value={props.localisation}
            onChange={props.setLocalisation}
            type={props.type}
          />
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <ValueInput
            value={props.valeur}
            onChange={props.setValeur}
            type={props.type}
          />
        </Col>
        <Col>
          <UnitSelector
            value={props.unite}
            onChange={props.setUnite}
            type={props.type}
            localisation={props.localisation}
          />
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <NoteInput value={props.note} onChange={props.setNote} />
        </Col>
      </Row>
    </>
  )
}
