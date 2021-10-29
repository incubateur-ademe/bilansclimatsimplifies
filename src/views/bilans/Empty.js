import React from 'react'

import MagicLink from 'components/base/MagicLink'

export default function Empty() {
  return (
    <div>
      Vous n'avez pas encore ajouté de bilan
      <MagicLink to={'/bilans/nouveau'}>Ajouter un bilan</MagicLink>
    </div>
  )
}
