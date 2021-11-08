import React from 'react'
import { useParams } from 'react-router-dom'

import { useBilan } from 'hooks/useBilans'
import { useEmissions } from 'hooks/useEmissions'
import MagicLink from 'components/base/MagicLink'
import Emission from './poste/Emission'
import Empty from './poste/Empty'
import NewEmission from './poste/NewEmission'

export default function Poste() {
  const { id, poste: posteSlug } = useParams()
  const poste = posteSlug === 'poste1' ? 1 : 2

  const { data: bilan } = useBilan(id)
  const { data: emissions } = useEmissions(id)

  return (
    <div>
      <MagicLink to={`/bilans`}>Retour à la liste des bilans</MagicLink>
      <h1>
        {bilan && bilan.raisonSociale} - {bilan && bilan.annee} - Poste {poste}
      </h1>
      {emissions &&
      emissions.filter((emission) => emission.poste === poste).length ? (
        <>
          {emissions
            .filter((emission) => emission.poste === poste)
            .map((emission) => (
              <Emission key={emission.id} emission={emission} />
            ))}
        </>
      ) : (
        <Empty />
      )}
      <NewEmission bilan={id} poste={poste} />
      <div>
        <hr />
        <div>
          Total :{' '}
          {emissions &&
            emissions
              .filter((emission) => emission.poste === poste)
              .reduce((acc, cur) => acc + cur.resultat, 0)}
        </div>
        {poste === 1 ? (
          <MagicLink to={`/bilans/${id}/poste2`}>Passer au poste 2</MagicLink>
        ) : (
          <>
            <MagicLink to={`/bilans/${id}/poste1`}>
              Revenir au poste 1
            </MagicLink>{' '}
            <MagicLink to={`/bilans/${id}`}>Valider mon bilan</MagicLink>
          </>
        )}
      </div>
    </div>
  )
}
