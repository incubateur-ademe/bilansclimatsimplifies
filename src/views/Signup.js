import React, { useState } from 'react'
import {
  Row,
  Col,
  TextInput,
  Checkbox,
  Button,
  ButtonGroup,
  Alert,
} from '@dataesr/react-dsfr'

import { useSignup } from 'hooks/useUser'
import MagicLink from 'components/base/MagicLink'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [cgu, setCgu] = useState(false)

  const mutation = useSignup()

  return (
    <>
      <Row gutters>
        <Col>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              mutation.mutate(
                {
                  email,
                  firstname,
                  lastname,
                  cgu,
                },
                {
                  onSuccess: () => {
                    console.log('wouh')
                  },
                }
              )
            }}
          >
            <TextInput
              label={`Email`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextInput
              label={`Prénom`}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <TextInput
              label={`Nom`}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <Checkbox
              checked={cgu}
              value={'cgu'}
              label={`J'accepte la politique de protection des données personnelles de l'ADEME`}
              onChange={(e) => setCgu((prevCgu) => !prevCgu)}
              required
            />
            <ButtonGroup align='right' isInlineFrom='md'>
              <MagicLink to={`/`}>
                <Button secondary>Annuler</Button>
              </MagicLink>
              <Button submit>Valider</Button>
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
