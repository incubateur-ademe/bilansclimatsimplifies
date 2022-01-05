import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert,
  ButtonGroup,
  Button,
} from '@dataesr/react-dsfr'

import {
  validateSiren,
  validateNombreSalaries,
  validateAnnee,
} from 'utils/validators'
import { useBilansCreation } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'
import BilanForm from './newBilan/BilanForm'

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
  const dictionary = {
    annee: 'Année de reporting du bilan',
    nombreSalaries: 'Nombre de salariés',
    siren: 'SIREN',
  }

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
            <BilanForm
              raisonSociale={raisonSociale}
              setRaisonSociale={setRaisonSociale}
              nombreSalaries={nombreSalaries}
              setNombreSalaries={setNombreSalaries}
              siren={siren}
              setSiren={setSiren}
              naf={naf}
              setNaf={setNaf}
              region={region}
              setRegion={setRegion}
              annee={annee}
              setAnnee={setAnnee}
              errors={errors}
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
                description={`${
                  errors.length > 1 ? 'Les champs' : 'Le champ'
                } ${errors
                  .map(
                    (error, index) =>
                      `${dictionary[error]}${
                        index === errors.length - 2
                          ? ' et '
                          : index < errors.length - 2
                          ? ', '
                          : ''
                      }`
                  )
                  .join('')} ${
                  errors.length > 1
                    ? 'ne sont pas correctement remplis'
                    : `n'est pas correctement rempli`
                }.`}
              />
            ) : null}
          </form>
        </Col>
      </Row>
    </>
  )
}
