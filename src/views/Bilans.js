import React from 'react'
import { Row, Col, Title, ButtonGroup, Button } from '@dataesr/react-dsfr'

import { useBilans } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'
import Bilan from './bilans/Bilan'
import Empty from './bilans/Empty'

export default function Bilans() {
  const { data: bilans } = useBilans()
  return (
    <>
      {bilans && bilans.length ? (
        <>
          {bilans.filter((bilan) => bilan.statut === 'brouillon').length ? (
            <>
              <Title as='h2'>Mes brouillons</Title>
              {bilans
                .filter((bilan) => bilan.statut === 'brouillon')
                .map((bilan) => (
                  <Bilan key={bilan.id} bilan={bilan} />
                ))}
            </>
          ) : null}
          {bilans.filter((bilan) => bilan.statut !== 'brouillon').length ? (
            <>
              <Title as='h2'>Mes bilans</Title>
              {bilans
                .filter((bilan) => bilan.statut !== 'brouillon')
                .map((bilan) => (
                  <Bilan key={bilan.id} bilan={bilan} />
                ))}
            </>
          ) : null}
          <Row gutters>
            <Col>
              <ButtonGroup isInlineFrom='md' align='right'>
                <MagicLink to={'/bilans/nouveau'}>
                  <Button>Ajouter un bilan</Button>
                </MagicLink>
              </ButtonGroup>
            </Col>
          </Row>
        </>
      ) : (
        <Empty />
      )}
    </>
  )
}
