import React from 'react'
import { Row, Col, Text, Title } from '@dataesr/react-dsfr'

import ContactForm from './home/ContactForm'
export default function Home() {
  return (
    <Row>
      <Col>
        <Title as='h1'>Bilans Climat Simplifiés</Title>
        <Text size='lead'>
          Retrouvez très prochainement l'outil Bilan Climat simplifié afin de
          réaliser vos bilans carbone d'entreprise sur les postes 1 & 2 du scope
          1.
        </Text>
        <ContactForm />
      </Col>
    </Row>
  )
}
