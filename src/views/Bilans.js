import React from 'react'
import { Row, Col, ButtonGroup, Button } from '@dataesr/react-dsfr'

import { useBilans } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'
import Bilan from './bilans/Bilan'
import Empty from './bilans/Empty'

export default function Bilans() {
  const { data: bilans } = useBilans()
  return (
    <>
      <h1>Mes bilans</h1>
      {bilans && bilans.length ? (
        <>
          {bilans.map((bilan) => (
            <Bilan key={bilan.id} bilan={bilan} />
          ))}
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
