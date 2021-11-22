import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Row, Col, Checkbox, ButtonGroup, Button } from '@dataesr/react-dsfr'

import { useBilan, useBilansMutation, useBilansDeletion } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'
import Poste from './bilan/Poste'

export default function Bilan() {
  const { id } = useParams()

  const history = useHistory()

  const { data: bilan } = useBilan(id)

  const mutation = useBilansMutation(id)

  const deletion = useBilansDeletion(id)

  return (
    <div>
      <ButtonGroup align='left' isInlineFrom='md'>
        <MagicLink to={`/bilans`}>
          <Button icon='fr-fi-arrow-left-s-line-double' secondary>
            Retour à la liste de mes bilans
          </Button>
        </MagicLink>
      </ButtonGroup>
      <h1>
        {bilan?.raisonSociale} - {bilan?.annee} - {bilan?.statut}
      </h1>
      <p>
        Siren : {bilan?.siren}
        <br />
        Nombre de salariés : {bilan?.nombreSalaries}
        <br />
        Région : {bilan?.region}
        <br />
        NAF : {bilan?.naf}
        <br />
        <br />
        <Checkbox
          checked={bilan?.mode === 'manuel'}
          onChange={() =>
            mutation.mutate({
              mode: bilan?.mode === 'manuel' ? 'auto' : 'manuel',
            })
          }
          label={`J'ai déja fait mon bilan`}
        />
      </p>
      <Row gutters>
        {bilan &&
          [1, 2].map((index) => (
            <Poste key={index} bilan={bilan} index={index} />
          ))}
      </Row>
      <br />
      <br />
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
    </div>
  )
}
