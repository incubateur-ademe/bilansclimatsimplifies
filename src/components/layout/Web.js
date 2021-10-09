import React from 'react'
import { Container } from '@dataesr/react-dsfr'
import Header from './Header'

export default function Web(props) {
  return (
    <>
      <Header />
      <Container role='main'>{props.children}</Container>
    </>
  )
}
