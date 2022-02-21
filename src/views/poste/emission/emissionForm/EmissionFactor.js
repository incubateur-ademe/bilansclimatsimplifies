import React from 'react'
import styled from 'styled-components'

import { useFacteursEmission } from 'hooks/useFacteursEmission'

const Wrapper = styled.div`
  min-height: 1.5rem;
  text-align: right;
`
export default function EmissionFactor(props) {
  const { data: facteurEmission } = useFacteursEmission()

  console.log(props.type)
  console.log(props.localisation)
  console.log(props.unite)

  return (
    <Wrapper>
      {props.type && props.localisation && props.unite && (
        <>
          (
          {
            facteurEmission[props.type].facteurs[props.localisation][
              'kgCO2e/' + props.unite
            ]
          }{' '}
          kgCO2e/{props.unite})
        </>
      )}
    </Wrapper>
  )
}
