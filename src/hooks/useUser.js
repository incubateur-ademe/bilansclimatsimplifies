import { useContext } from 'react'

import { useQuery, useMutation } from 'react-query'
import axios from 'axios'

import apiUrl, { baseUrl } from 'utils/apiUrl'
import AuthContext from 'utils/AuthContext'

export function useLoginUser() {
  const { data: csrfToken } = useCsrfToken()

  const { setToken } = useContext(AuthContext)

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
