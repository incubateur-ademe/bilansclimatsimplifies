import React from 'react'
import { useParams } from 'react-router-dom'

import MagicLink from 'components/base/MagicLink'

export default function TypeBilan() {
  const { id } = useParams()

  return (
    <div>
      <MagicLink to={`/bilans/${id}/totaux`}>
        J'ai déja fait mon bilan
      </MagicLink>
      <br />
      <br />
      <MagicLink to={`/bilans/${id}/poste1`}>
        Je n'ai pas déjà fait mon bilan
      </MagicLink>
    </div>
  )
}
