import React from 'react'

import { useBilans } from 'hooks/useBilans'

import MagicLink from 'components/base/MagicLink'
import Bilan from './bilans/Bilan'
import Empty from './bilans/Empty'

export default function Bilans() {
  const { data: bilans } = useBilans()
  return (
    <div>
      <h1>Bilans</h1>
      {bilans && bilans.length ? (
        <>
          {bilans.map((bilan) => (
            <Bilan key={bilan.id} bilan={bilan} />
          ))}
          <MagicLink to={'/bilans/nouveau'}>Ajouter un bilan</MagicLink>
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}
