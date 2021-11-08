import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { useBilan } from 'hooks/useBilans'
import { useEmissions } from 'hooks/useBilans'

export default function Bilan() {
  const history = useHistory()

  const { id } = useParams()

  const { data: bilan } = useBilan(id)
  const { data: emissions } = useEmissions(id)

  useEffect(() => {
    bilan && !bilan.total && history.push(`/bilans/${id}/poste1`)
  }, [bilan, history, id])

  return (
    <div>
      <h1>
        {bilan && bilan.raisonSociale} - {bilan && bilan.annee} - Bilan terminé
      </h1>
      <div>
        Poste 1 :{' '}
        {emissions &&
          emissions
            .filter((emission) => emission.poste === 1)
            .reduce((acc, cur) => acc + cur.resultat, 0)}
      </div>
      <div>
        Poste 2 :{' '}
        {emissions &&
          emissions
            .filter((emission) => emission.poste === 2)
            .reduce((acc, cur) => acc + cur.resultat, 0)}
      </div>
    </div>
  )
}
