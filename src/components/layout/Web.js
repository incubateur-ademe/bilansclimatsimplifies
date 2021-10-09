import React from 'react'
import styled from 'styled-components'
import { Container } from '@dataesr/react-dsfr'
import Header from './Header'

const StyledContainer = styled(Container)`
  max-width: 36rem;
  padding-top: 3rem;
`
export default function Web(props) {
  return (
    <>
      <Header />
      <StyledContainer role='main'>{props.children}</StyledContainer>
    </>
  )
}
