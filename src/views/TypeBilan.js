import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button, ButtonGroup } from '@dataesr/react-dsfr'

import { useBilansMutation } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'

export default function TypeBilan() {
  const history = useHistory()

  const { id } = useParams()

  const mutation = useBilansMutation(id)

  return (
    <ButtonGroup isInlineFrom='md' align='center' isEquisized>
      <Button
        secondary
        onClick={() =>
          mutation.mutate(
            { mode: 'manuel' },
            {
              onSuccess: () => {
                history.push(`/bilans/${id}`)
              },
            }
          )
        }
      >
        J'ai déja fait mon bilan
      </Button>
      <MagicLink to={`/bilans/${id}/poste1`}>
        <Button>Je n'ai pas déjà fait mon bilan</Button>
      </MagicLink>
    </ButtonGroup>
  )
}
