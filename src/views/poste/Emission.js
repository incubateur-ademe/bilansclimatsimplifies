import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Row, Col, Button, ButtonGroup } from '@dataesr/react-dsfr'

import { useEmissionsMutation, useEmissionsDeletion } from 'hooks/useEmissions'
import { useToast } from 'hooks/useToast'
import EmissionForm from './emission/EmissionForm'

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
  border: 1px solid rgb(232, 232, 232);
`
export default function Emission(props) {
  const [edit, setEdit] = useState(false)

  const [type, setType] = useState('')
  const [localisation, setLocalisation] = useState('')
  const [valeur, setValeur] = useState('')
  const [unite, setUnite] = useState('')
  const [note, setNote] = useState('')
  const [classification, setClassification] = useState('')
  useEffect(() => {
    setType(props.emission.type)
    setValeur(props.emission.valeur)
    setUnite(props.emission.unite)
    setNote(props.emission.note)
    setClassification(props.emission.classification)
  }, [props.emission])
  console.log(props.emission)
  const mutation = useEmissionsMutation(props.emission.id)
  const deletion = useEmissionsDeletion(props.emission.id)

  useToast(mutation)

  return (
    <Row gutters>
      <Col>
        <Wrapper>
          {edit ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                mutation.mutate(
                  {
                    type,
                    localisation,
                    valeur: String(valeur).replace(',', '.'),
                    unite,
                    note,
                  },
                  { onSuccess: () => setEdit(false) }
                )
              }}
            >
              <EmissionForm
                poste={props.emission.poste}
                type={type}
                setType={setType}
                localisation={localisation}
                setLocalisation={setLocalisation}
                valeur={valeur}
                setValeur={setValeur}
                unite={unite}
                setUnite={setUnite}
                note={note}
                setNote={setNote}
                classification={classification}
                setClassification={setClassification}
              />
              <Row gutters>
                <Col>
                  <ButtonGroup isInlineFrom='md' align='right'>
                    <Button secondary onClick={() => setEdit(false)}>
                      Annuler
                    </Button>
                    <Button submit>Valider</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </form>
          ) : (
            <>
              <h4>
                {props.emission.type}{' '}
                {props.emission.note && <i>- {props.emission.note}</i>}
              </h4>
              <div>
                {props.emission.valeur} {props.emission.unite} :{' '}
                <strong>{props.emission.resultat} kgCO2e</strong>
              </div>
              <ButtonGroup isInlineFrom='md' align='right'>
                <Button
                  secondary
                  onClick={() =>
                    window.confirm(
                      "Souhaitez-vous vraiment supprimer cette source d'émission ?"
                    ) && deletion.mutate()
                  }
                >
                  Supprimer
                </Button>
                <Button onClick={() => setEdit(true)}>Éditer</Button>
              </ButtonGroup>
            </>
          )}
        </Wrapper>
      </Col>
    </Row>
  )
}
