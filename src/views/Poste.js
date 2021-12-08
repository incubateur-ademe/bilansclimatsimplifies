import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Button, ButtonGroup } from '@dataesr/react-dsfr'

import { useBilan } from 'hooks/useBilans'
import { useEmissions } from 'hooks/useEmissions'
import MagicLink from 'components/base/MagicLink'
import Emission from './poste/Emission'
import Empty from './poste/Empty'
import NewEmission from './poste/NewEmission'
import Navigation from './poste/Navigation'

export default function Poste() {
  const { id, poste: posteSlug } = useParams()
  const poste = posteSlug === 'poste1' ? 1 : 2

  const { data: bilan } = useBilan(id)
  const { data: emissions } = useEmissions(id)

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
            {bilan?.raisonSociale} - {bilan?.annee} - Poste {poste}
          </h1>
        </Col>
      </Row>
      {emissions &&
      emissions.filter((emission) => emission.poste === poste).length ? (
        <>
          {emissions
            .filter((emission) => emission.poste === poste)
            .map((emission) => (
              <Emission key={emission.id} emission={emission} />
            ))}
        </>
      ) : (
        <Empty />
      )}
      <NewEmission bilan={id} poste={poste} />
      <br />
      <br />
      <Navigation bilan={bilan} poste={poste} id={id} />
    </>
  )
}
