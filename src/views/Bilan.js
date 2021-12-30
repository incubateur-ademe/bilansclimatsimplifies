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
  Callout,
  CalloutTitle,
  Text,
} from '@dataesr/react-dsfr'

import { useBilan, useBilansMutation, useBilansDeletion } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'
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
              <Button onClick={() => window.print()}>Imprimer ce bilan</Button>
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
      <Row>
        <Col>
          <Callout hasInfoIcon={false}>
            <CalloutTitle>Pour aller plus loin</CalloutTitle>
            <Text>
              Le Bilan Climat Simplifié est un bref aperçu du réel impact GES de
              votre entreprise et ses activités. En effet, pour la plupart des
              entreprises, 70% de vos émissions concernent des postes non
              calculés ici. Nous vous invitons donc à poursuivre l’exercice vers
              un Bilan GES exhaustif de vos émissions qui est le meilleur moyen
              de savoir où agir ! Rendez-vous sur notre Centre de Ressources
              dédié.
            </Text>
            <Text>
              Au-delà de la quantification de vos émissions GES, l’ADEME vous
              accompagne dans la transition écologique de votre entreprise.
              Retrouvez toutes nos aides et offres d’accompagnement sur notre
              plateforme{' '}
              <MagicLink to='https://agirpourlatransition.ademe.fr/'>
                AGIR pour la transition
              </MagicLink>
              .
            </Text>
          </Callout>
        </Col>
      </Row>
    </>
  )
}
