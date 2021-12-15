import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  ButtonGroup,
  Button,
} from '@dataesr/react-dsfr'

import { useBilan, useBilansMutation } from 'hooks/useBilans'
import Poste from './bilan/Poste'

export default function TotauxBilan() {
  const { id } = useParams()

  const history = useHistory()

  const { data: bilan } = useBilan(id)

  const mutation = useBilansMutation(id)

  return (
    <>
      <Row gutters>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem href='/bilans'>Mes bilans</BreadcrumbItem>
            <BreadcrumbItem href={`/bilans/${id}`}>
              {bilan?.raisonSociale} - {bilan?.annee}
            </BreadcrumbItem>
            <BreadcrumbItem>Totaux</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row gutters>
        {bilan &&
          [1, 2].map((index) => (
            <Poste key={index} bilan={bilan} index={index} edit />
          ))}
      </Row>
      <ButtonGroup isInlineFrom='md' align='right'>
        <Button
          icon='fr-fi-check-line'
          iconPosition='right'
          onClick={() =>
            mutation.mutate(
              {
                statut: 'publié',
              },
              {
                onSuccess: () => {
                  history.push(`/bilans/${id}?done=1`)
                },
              }
            )
          }
        >
          Publier mon bilan
        </Button>
      </ButtonGroup>
    </>
  )
}
