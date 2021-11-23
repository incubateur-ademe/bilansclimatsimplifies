import React from 'react'
import styled from 'styled-components'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  Checkbox,
  ButtonGroup,
  Button,
  Alert,
  Highlight,
  Tag,
} from '@dataesr/react-dsfr'

import { useBilan, useBilansMutation, useBilansDeletion } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'
import Poste from './bilan/Poste'

const StyledTag = styled(Tag)`
  font-size: 2.5rem;
  line-height: 3rem;
  border-radius: 1.5rem;
  text-transform: capitalize;
`
export default function Bilan() {
  const { id } = useParams()

  const location = useLocation()

  const history = useHistory()

  const { data: bilan } = useBilan(id)

  const mutation = useBilansMutation(id)

  const deletion = useBilansDeletion(id)

  return (
    <>
      <Row gutters>
        <Col>
          <ButtonGroup align='left' isInlineFrom='md'>
            <MagicLink to={`/bilans`}>
              <Button icon='fr-fi-arrow-left-s-line-double' secondary>
                Retour à la liste de mes bilans
              </Button>
            </MagicLink>
          </ButtonGroup>
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <h1>
            {bilan?.raisonSociale} - {bilan?.annee}{' '}
            <StyledTag>{bilan?.statut}</StyledTag>
          </h1>
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <Highlight>
            Siren : {bilan?.siren}
            <br />
            Nombre de salariés : {bilan?.nombreSalaries}
            <br />
            Région : {bilan?.region}
            <br />
            NAF : {bilan?.naf}
            <br />
          </Highlight>
          <br />
        </Col>
      </Row>
      {location.search.includes('done=1') && (
        <Row gutters>
          <Col>
            <Alert title={`Votre bilan est publié`} type='success' />
          </Col>
        </Row>
      )}
      <Row gutters>
        {bilan &&
          [1, 2].map((index) => (
            <Poste key={index} bilan={bilan} index={index} />
          ))}
      </Row>
      <Row gutters>
        <Col>
          <Checkbox
            checked={bilan?.mode === 'manuel'}
            onChange={() =>
              mutation.mutate({
                mode: bilan?.mode === 'manuel' ? 'auto' : 'manuel',
              })
            }
            label={`J'ai déja fait mon bilan`}
          />
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <ButtonGroup isInlineFrom='md' align='right'>
            <Button
              secondary
              onClick={() =>
                window.confirm(
                  'Souhaitez-vous vraiment supprimer ce bilan ?'
                ) &&
                deletion.mutate(null, {
                  onSuccess: (data) => {
                    history.push(`/bilans`)
                  },
                })
              }
            >
              Supprimer ce bilan
            </Button>
            <MagicLink to={`/bilans/${id}/infos`}>
              <Button>Éditer les informations de ce bilan</Button>
            </MagicLink>
          </ButtonGroup>
        </Col>
      </Row>
    </>
  )
}
