import React from 'react'
import styled from 'styled-components'
import { Row, Col, RadioGroup, Select, Radio } from '@dataesr/react-dsfr'

import TypeSelector from './emissionForm/TypeSelector'
import LocationSelector from './emissionForm/LocationSelector'
import UnitSelector from './emissionForm/UnitSelector'
import ValueInput from './emissionForm/ValueInput'
import NoteInput from './emissionForm/NoteInput'

const StyledCol = styled(Col)`
  @media only screen and (max-width: 48em) {
    flex: 1;
    width: 100%;
    max-width: 100%;
  }
`
export default function EmissionForm(props) {
  console.log(props.classification)
  return props.classification || props.poste === 1 ? (
    <>
      {props.poste === 2 && (
        <Row gutters>
          <StyledCol n='6'>
            <Select
              selected={props.classification}
              onChange={(e) => {
                props.setClassification(e.target.value)
                props.setType('')
                props.setUnite('')
                props.setValeur('')
              }}
              options={[
                { value: 'carburant', label: 'Carburant' },
                { value: 'véhicule', label: 'Véhicule' },
              ]}
            />
          </StyledCol>
        </Row>
      )}
      <Row gutters>
        <StyledCol n='6'>
          <TypeSelector
            value={props.type}
            onChange={(type) => {
              props.setType(type)
              props.setLocalisation(null)
            }}
            classification={props.classification}
            poste={props.poste}
          />
        </StyledCol>
      </Row>
      <Row gutters>
        <StyledCol n='6'>
          <LocationSelector
            value={props.localisation}
            onChange={props.setLocalisation}
            type={props.type}
          />
        </StyledCol>
      </Row>
      <Row gutters>
        <StyledCol>
          <ValueInput
            value={props.valeur}
            onChange={props.setValeur}
            type={props.type}
          />
        </StyledCol>
        <StyledCol>
          <UnitSelector
            value={props.unite}
            onChange={props.setUnite}
            type={props.type}
            localisation={props.localisation}
          />
        </StyledCol>
      </Row>
      <Row gutters>
        <Col>
          <NoteInput value={props.note} onChange={props.setNote} />
        </Col>
      </Row>
    </>
  ) : (
    <Row gutters>
      <Col>
        <RadioGroup onChange={props.setClassification} legend=''>
          <Radio
            label='Je connais les consommations de carburant de mes véhicules'
            value='carburant'
            isExtended
          />
          <Radio
            label='Je connais les distances parcourues et tonnages transportés de mes véhicules'
            value='véhicule'
            isExtended
          />
        </RadioGroup>
      </Col>
    </Row>
  )
}
