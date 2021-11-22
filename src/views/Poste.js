import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button, ButtonGroup, Title } from '@dataesr/react-dsfr'

import { useBilan, useBilansMutation } from 'hooks/useBilans'
import { useEmissions } from 'hooks/useEmissions'
import MagicLink from 'components/base/MagicLink'
import Emission from './poste/Emission'
import Empty from './poste/Empty'
import NewEmission from './poste/NewEmission'

export default function Poste() {
  const history = useHistory()

  const { id, poste: posteSlug } = useParams()
  const poste = posteSlug === 'poste1' ? 1 : 2

  const { data: bilan } = useBilan(id)
  const { data: emissions } = useEmissions(id)
  const mutation = useBilansMutation(id)

  return (
    <div>
      <MagicLink to={`/bilans`}>Retour à la liste de mes bilans</MagicLink>
      <h1>
        {bilan?.raisonSociale} - {bilan?.annee} - Poste {poste}
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
        <Title as='h2'>
          {' '}
          Total :{' '}
          {emissions &&
            emissions
              .filter((emission) => emission.poste === poste)
              .reduce((acc, cur) => acc + cur.resultat, 0)}{' '}
          kgCO2e
        </Title>
        {poste === 1 ? (
          <ButtonGroup isInlineFrom='md' align='right'>
            <MagicLink to={`/bilans/${id}/`}>
              <Button secondary icon='fr-fi-arrow-left-s-line-double'>
                Revenir aux informations du bilan
              </Button>
            </MagicLink>
            <MagicLink to={`/bilans/${id}/poste2`}>
              <Button
                icon='fr-fi-arrow-right-s-line-double'
                iconPosition='right'
              >
                Passer au poste 2
              </Button>
            </MagicLink>
          </ButtonGroup>
        ) : (
          <ButtonGroup isInlineFrom='md' align='right'>
            <MagicLink to={`/bilans/${id}/poste1`}>
              <Button icon='fr-fi-arrow-left-s-line-double'>
                Revenir au poste 1
              </Button>
            </MagicLink>
            <Button
              icon='fr-fi-check-line'
              iconPosition='right'
              onClick={() =>
                mutation.mutate(
                  {
                    statut: 'publié',
                  },
                  {
                    onSuccess: () => {
                      history.push(`/bilans/${id}`)
                    },
                  }
                )
              }
            >
              Valider mon bilan
            </Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  )
}
