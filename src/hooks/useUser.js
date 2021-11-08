import { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import axios from 'axios'

import apiUrl, { baseUrl } from 'utils/apiUrl'

export function useLoginUser() {
  const { data: csrfToken } = useCsrfToken()
  const { setToken } = useLocalToken()
  return useMutation(
    (user) =>
      axios.post(`${apiUrl}/auth/`, user, {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      }),
    {
      onSuccess: ({ data }) => {
        setToken(data.token)
      },
    }
  )
}

export function useCsrfToken() {
  return useQuery(['csrfToken'], () =>
    axios.get(`${baseUrl}/csrf/`).then((res) => res.data.csrfToken)
  )
}

export function useLocalToken() {
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

  return { token, setToken }
}
