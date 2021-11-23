import React from 'react'
import { useLocation } from 'react-router-dom'

import queryString from 'query-string'

export default function Login() {
  const location = useLocation()

  const query = queryString.parse(location.search)

  console.log(query)

  return <div>Login</div>
}
