import React from 'react'
import styled from 'styled-components'

import MagicLink from './MagicLink'

const StyledMagicLink = styled(MagicLink)`
  padding: 0;
  margin: 0;
  color: #383838;
  text-decoration: underline;
  background-color: transparent;
  border: none;
`
export default function FakeLink(props) {
  return (
    <StyledMagicLink
      to={props.to}
      onClick={props.onClick}
      disabled={props.disabled}
      hollow={props.hollow}
      small={props.small}
      className={props.className}
      textColor={props.textColor}
      aria-label={props.children}
    >
      {props.children}
    </StyledMagicLink>
  )
}
