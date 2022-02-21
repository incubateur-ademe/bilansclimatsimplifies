import React from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Row,
  Col,
  Title,
  Text,
} from '@dataesr/react-dsfr'

import { useBilan, useBilansMutation } from 'hooks/useBilans'

const Wrapper = styled.div`
  border: 1px solid rgb(232, 232, 232);
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
  text-align: center;
`
export default function TypeBilan() {
  const history = useHistory()

  const { id } = useParams()

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
            <BreadcrumbItem>Type</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <Wrapper>
            <Title as='h2' look='h4'>
              J’ai déjà calculé mon bilan
              <span
                dangerouslySetInnerHTML={{
                  __html: '&nbsp;',
                }}
              />
              simplifié
            </Title>
            <Text>
              Vous connaissez déjà le total de vos émissions des postes 1 et 2.
              <br />
              <br />
            </Text>
            <ButtonGroup align='center' isInlineFrom='md'>
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
                J’ai déjà calculé mon bilan
              </Button>
            </ButtonGroup>
          </Wrapper>
        </Col>
        <Col>
          <Wrapper>
            <Title as='h2' look='h4'>
              Je souhaite calculer mon bilan
              <span
                dangerouslySetInnerHTML={{
                  __html: '&nbsp;',
                }}
              />
              simplifié
            </Title>
            <Text>
              Vous avez besoin de calculer les émissions de toutes vos sources
              des postes 1 et 2 individuellement.
            </Text>
            <ButtonGroup align='center' isInlineFrom='md'>
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
                Je calcule mon bilan
              </Button>
            </ButtonGroup>
          </Wrapper>
        </Col>
      </Row>
    </>
  )
}
