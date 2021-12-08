import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useIsFetching } from 'react-query'
import {
  Button,
  ButtonGroup,
  Callout,
  CalloutTitle,
  Text,
} from '@dataesr/react-dsfr'

import { useBilansMutation } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'

const StyledCalloutTitle = styled(CalloutTitle)`
  text-align: center;
`
export default function Navigation(props) {
  const history = useHistory()

  const mutation = useBilansMutation(props.id)

  const isFetching = useIsFetching()

  return (
    <Callout hasInfoIcon={false}>
      <StyledCalloutTitle as='h3'>
        Total : {props.bilan && props.bilan[`poste${props.poste}`]} kgCO2e
      </StyledCalloutTitle>
      <Text align='center'>
        {isFetching
          ? 'Sauvegarde en cours...'
          : `Votre bilan est sauvegardé. Vous pouvez fermer cette page et revenir l'éditer plus tard`}
      </Text>
      {props.poste === 1 ? (
        <ButtonGroup isInlineFrom='md' align='center' isEquisized>
          <MagicLink to={`/bilans/${props.id}/`}>
            <Button secondary icon='fr-fi-arrow-left-s-line-double'>
              Revenir au bilan
            </Button>
          </MagicLink>
          <MagicLink to={`/bilans/${props.id}/poste2`}>
            <Button icon='fr-fi-arrow-right-s-line-double' iconPosition='right'>
              Passer au poste 2
            </Button>
          </MagicLink>
        </ButtonGroup>
      ) : (
        <ButtonGroup isInlineFrom='md' align='center' isEquisized>
          <MagicLink to={`/bilans/${props.id}/poste1`}>
            <Button secondary icon='fr-fi-arrow-left-s-line-double'>
              Revenir au poste 1
            </Button>
          </MagicLink>
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
                    history.push(`/bilans/${props.id}?done=1`)
                  },
                }
              )
            }
          >
            Publier mon bilan
          </Button>
        </ButtonGroup>
      )}
    </Callout>
  )
}
