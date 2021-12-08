import React from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { Button, ButtonGroup, Row, Col, Title, Text } from '@dataesr/react-dsfr'

import { useBilansMutation } from 'hooks/useBilans'

const Wrapper = styled.div`
  border: 1px solid rgb(232, 232, 232);
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
`
export default function TypeBilan() {
  const history = useHistory()

  const { id } = useParams()

  const mutation = useBilansMutation(id)

  return (
    <Row gutters>
      <Col>
        <Wrapper>
          <Title as='h2' look='h4'>
            J'ai déjà fait mon bilan
          </Title>
          <Text>
            Si vous connaissez déjà le total des emissions de chaque poste.
          </Text>
          <ButtonGroup align='right' isInlineFrom='md'>
            <Button
              onClick={() =>
                mutation.mutate(
                  { mode: 'manuel' },
                  {
                    onSuccess: () => {
                      history.push(`/bilans/${id}/totaux`)
                    },
                  }
                )
              }
            >
              J'ai déja fait mon bilan
            </Button>
          </ButtonGroup>
        </Wrapper>
      </Col>
      <Col>
        <Wrapper>
          <Title as='h2' look='h4'>
            Je n'ai pas déjà fait mon bilan
          </Title>
          <Text>
            Si vous avez besoin de rentrer chaque source d'emission
            individuellement.
          </Text>
          <ButtonGroup align='right' isInlineFrom='md'>
            <Button
              onClick={() =>
                mutation.mutate(
                  { mode: 'auto' },
                  {
                    onSuccess: () => {
                      history.push(`/bilans/${id}/poste1`)
                    },
                  }
                )
              }
            >
              Je n'ai pas déjà fait mon bilan
            </Button>
          </ButtonGroup>
        </Wrapper>
      </Col>
    </Row>
  )
}
