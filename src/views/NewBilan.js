import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  validateSiren,
  validateNombreSalaries,
  validateAnnee,
} from 'utils/validators'
import listNaf from 'utils/listNaf'
import listRegions from 'utils/listRegions'
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
  Select,
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

  const [errors, setErrors] = useState([])

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
              mutation.reset()
              setErrors([])
              let error = false
              if (!validateSiren(siren)) {
                setErrors((prevErrors) => [...prevErrors, 'siren'])
                error = true
              }
              if (!validateNombreSalaries(nombreSalaries)) {
                setErrors((prevErrors) => [...prevErrors, 'nombreSalaries'])
                error = true
              }
              if (!validateAnnee(annee)) {
                setErrors((prevErrors) => [...prevErrors, 'annee'])
                error = true
              }

              if (!error) {
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
              }
            }}
          >
            <TextInput
              label={`Raison sociale`}
              value={raisonSociale}
              onChange={(e) => setRaisonSociale(e.target.value)}
              required
            />
            <TextInput
              type='number'
              label={`Nombre de salariés`}
              hint='Ce bilan est réservé aux entreprises de 50 à 500 salariés'
              value={nombreSalaries}
              onChange={(e) => setNombreSalaries(e.target.value)}
              messageType={errors.includes('nombreSalaries') ? 'error' : null}
              required
            />
            <TextInput
              label={`SIREN`}
              value={siren}
              onChange={(e) => setSiren(e.target.value)}
              messageType={errors.includes('siren') ? 'error' : null}
              required
            />
            <Select
              label={`Secteur d'activité (NAF rév. 2)`}
              options={[
                {
                  value: '',
                  label: '',
                  disabled: true,
                  hidden: true,
                },
                ...listNaf,
              ]}
              selected={naf}
              onChange={(e) => setNaf(e.target.value)}
              required
            />
            <Select
              label={`Région du siège de l’entreprise`}
              options={[
                {
                  value: '',
                  label: '',
                  disabled: true,
                  hidden: true,
                },
                ...listRegions,
              ]}
              selected={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />

            <TextInput
              label={`Année de reporting du bilan`}
              hint='Année n, n-1 ou n-2 par rapport à l’année en cours'
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
              messageType={errors.includes('annee') ? 'error' : null}
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
            {errors.length ? (
              <Alert
                type='error'
                title='Votre formulaire comporte des erreurs'
              />
            ) : null}
          </form>
        </Col>
      </Row>
    </>
  )
}
