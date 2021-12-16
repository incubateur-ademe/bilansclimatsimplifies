import React from 'react'
import styled from 'styled-components'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  ButtonGroup,
  Button,
  Alert,
  Tag,
} from '@dataesr/react-dsfr'

import { useBilan, useBilansMutation, useBilansDeletion } from 'hooks/useBilans'
import Poste from './bilan/Poste'
import Details from './bilan/Details'

const StyledTag = styled(Tag)`
  font-size: 2.5rem;
  line-height: 3rem;
  border-radius: 1.5rem;
  text-transform: capitalize;
`
export default function Bilan() {
  const { id } = useParams()

  const history = useHistory()

  const mutation = useBilansMutation(id)
  const deletion = useBilansDeletion(id)

  const location = useLocation()

  const { data: bilan } = useBilan(id)

  return (
    <>
      <Row gutters>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem href='/bilans'>Mes bilans</BreadcrumbItem>
            <BreadcrumbItem>
              {bilan?.raisonSociale} - {bilan?.annee}
            </BreadcrumbItem>
          </Breadcrumb>
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
      {location.search.includes('done=1') && bilan?.statut === 'publié' && (
        <Row gutters>
          <Col>
            <Alert title={`Votre bilan est publié`} type='success' />
            <br />
          </Col>
        </Row>
      )}
      {location.search.includes('ready=1') && bilan?.statut !== 'publié' && (
        <Row gutters>
          <Col>
            <Alert
              title={`Votre bilan n'est pas encore publié. Cliquez sur "Publier ce bilan" ci-dessous pour le publier`}
            />
            <br />
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
          <Details bilan={bilan} />
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
            {bilan?.statut === 'publié' ? (
              <Button onClick={() => window.alert('Pas encore disponible')}>
                Télécharger ce bilan
              </Button>
            ) : (
              <Button
                icon='fr-fi-check-line'
                iconPosition='right'
                onClick={() =>
                  window.confirm(
                    `Souhaitez-vous vraiment publier ce bilan ?\r(Vous pourrez toujours l'éditer par la suite)`
                  ) &&
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
                Publier ce bilan
              </Button>
            )}
          </ButtonGroup>
        </Col>
      </Row>
    </>
  )
}
