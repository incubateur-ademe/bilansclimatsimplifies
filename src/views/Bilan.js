import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Row, Col, Tile, TileBody, Button } from '@dataesr/react-dsfr'

import { useBilan, useBilansDeletion } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'

export default function Bilan() {
  const { id } = useParams()

  const history = useHistory()

  const { data: bilan } = useBilan(id)

  const deletion = useBilansDeletion(id)

  return (
    <div>
      <MagicLink to={`/bilans`}>Retour à la liste des bilans</MagicLink>
      <h1>
        {bilan?.raisonSociale} - {bilan?.annee} - {bilan?.statut}
      </h1>
      <p>
        Siren : {bilan?.siren}
        <br />
        Nombre de salariés : {bilan?.nombreSalaries}
        <br />
        Région : {bilan?.region}
        <br />
        NAF : {bilan?.naf}
        <br />
        <br />
        <MagicLink to={`/bilans/${id}/infos`}>
          Éditer les informations de ce bilan
        </MagicLink>
      </p>
      <Row gutters>
        <Col>
          <Tile>
            <TileBody
              title={`Poste 1`}
              linkHref={`/bilans/${bilan?.id}/poste1`}
            >
              {bilan?.poste1 || bilan?.poste1 === 0 ? (
                <>Total : {bilan?.poste1}</>
              ) : (
                <Button onClick={() => ''}>
                  Calculer les émissions du poste 1
                </Button>
              )}
            </TileBody>
          </Tile>
        </Col>
        <Col>
          <Tile>
            <TileBody
              title={`Poste 2`}
              linkHref={`/bilans/${bilan?.id}/poste2`}
            >
              {bilan?.poste2 || bilan?.poste2 === 0 ? (
                <>Total : {bilan?.poste2}</>
              ) : (
                <>Calculer les émissions du poste 2</>
              )}
            </TileBody>
          </Tile>
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <Button
            onClick={() =>
              deletion.mutate(null, {
                onSuccess: (data) => {
                  history.push(`/bilans`)
                },
              })
            }
          >
            Supprimer ce bilan
          </Button>
        </Col>
      </Row>
    </div>
  )
}
