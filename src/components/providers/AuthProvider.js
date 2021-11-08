import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AuthContext from 'utils/AuthContext'

export default function ModalProvider(props) {
  const [token, setToken] = useState(sessionStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
      sessionStorage.removeItem('token')
      axios.defaults.headers.common['Authorization'] = ``
    }
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
