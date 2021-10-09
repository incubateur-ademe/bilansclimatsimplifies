import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  Header as Wrapper,
  HeaderOperator,
  HeaderBody,
  Logo,
  Service,
} from '@dataesr/react-dsfr'

import Ademe from 'components/base/Ademe'

export default function Header() {
  const location = useLocation()
  const [path, setPath] = useState(() => location.pathname || '')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (path !== location.pathname) {
      setPath(location.pathname)
    }
  }, [path, setPath, location])
  return (
    <Wrapper>
      <HeaderBody>
        <Logo splitCharacter={10}>République Française</Logo>
        <HeaderOperator>
          <Ademe />
        </HeaderOperator>
        <Service title='Bilans Climat Simplifiés' />
      </HeaderBody>
    </Wrapper>
  )
}
