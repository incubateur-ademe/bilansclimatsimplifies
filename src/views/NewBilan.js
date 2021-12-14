import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useBilansCreation } from 'hooks/useBilans'
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert,
  ButtonGroup,
  Button,
  TextInput,
} from '@dataesr/react-dsfr'
import MagicLink from 'components/base/MagicLink'

export default function AddBilan() {
  const history = useHistory()

  const [raisonSociale, setRaisonSociale] = useState('')
  const [nombreSalaries, setNombreSalaries] = useState('')
  const [siren, setSiren] = useState('')
  const [naf, setNaf] = useState('')
  const [region, setRegion] = useState('')
  const [annee, setAnnee] = useState('')

  const mutation = useBilansCreation()

  return (
    <>
      <Row gutters>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem href='/bilans'>Mes bilans</BreadcrumbItem>
            <BreadcrumbItem>Nouveau</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutation.mutate(
                {
                  raisonSociale,
                  nombreSalaries,
                  siren,
                  naf,
                  region,
                  annee,
                },
                {
                  onSuccess: (data) => {
                    history.push(`/bilans/${data.data.id}/type`)
                  },
                }
              )
            }}
          >
            <TextInput
              label={`Raison sociale`}
              value={raisonSociale}
              onChange={(e) => setRaisonSociale(e.target.value)}
              required
            />
            <TextInput
              label={`Nombre de salariés`}
              hint='Inférieur à 500'
              value={nombreSalaries}
              onChange={(e) => setNombreSalaries(e.target.value)}
              required
            />
            <TextInput
              label={`SIREN`}
              hint='SIREN réel nécessaire'
              value={siren}
              onChange={(e) => setSiren(e.target.value)}
              required
            />
            <TextInput
              label={`Section de nomenclature`}
              hint='Format : 01, 02, 03, etc.'
              value={naf}
              onChange={(e) => setNaf(e.target.value)}
              required
            />
            <TextInput
              label={`Région du siege`}
              hint='Format : 01, 02, 03, etc.'
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
            <TextInput
              label={`Année correspondant au bilan`}
              hint='Inférieure à 2022'
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
              required
            />
            <ButtonGroup isInlineFrom='md' align='right'>
              <MagicLink to='/bilans'>
                <Button secondary>Annuler</Button>
              </MagicLink>
              <Button submit>Commencer mon bilan</Button>
            </ButtonGroup>
            {mutation.isError && (
              <Alert type='error' title='Une erreur est survenue' />
            )}
          </form>
        </Col>
      </Row>
    </>
  )
}
