import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  Tile,
  TileBody,
  ButtonGroup,
  Button,
} from '@dataesr/react-dsfr'

import { useBilan, useBilansDeletion } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'

export default function Bilan() {
  const { id } = useParams()

  const history = useHistory()

  const { data: bilan } = useBilan(id)

  const deletion = useBilansDeletion(id)

  return (
    <div>
      <MagicLink to={`/bilans`}>
        <Button icon='fr-fi-arrow-left-s-line-double' secondary>
          Retour à la liste de mes bilans
        </Button>
      </MagicLink>
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
      </p>
      <Row gutters>
        <Col>
          <Tile>
            <TileBody title={`Poste 1`}>
              {bilan?.poste1 || bilan?.poste1 === 0 ? (
                <h3>{bilan?.poste1} kgCO2e</h3>
              ) : (
                <>Calculer les émissions du poste 2</>
              )}
              <MagicLink to={`/bilans/${bilan?.id}/poste1`}>
                <Button>Éditer le poste 1</Button>
              </MagicLink>
            </TileBody>
          </Tile>
        </Col>
        <Col>
          <Tile>
            <TileBody title={`Poste 2`}>
              {bilan?.poste2 || bilan?.poste2 === 0 ? (
                <h3>{bilan?.poste2} kgCO2e</h3>
              ) : (
                <>Calculer les émissions du poste 2</>
              )}
              <MagicLink to={`/bilans/${bilan?.id}/poste2`}>
                <Button>Éditer le poste 2</Button>
              </MagicLink>
            </TileBody>
          </Tile>
        </Col>
      </Row>
      <br />
      <br />
      <Row gutters>
        <Col>
          <ButtonGroup isInlineFrom='md' align='right'>
            <Button
              secondary
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
            <MagicLink to={`/bilans/${id}/infos`}>
              <Button>Éditer les informations de ce bilan</Button>
            </MagicLink>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  )
}
