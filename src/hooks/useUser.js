import { useQuery, useMutation } from 'react-query'
import axios from 'axios'

import apiUrl, { baseUrl } from 'utils/apiUrl'

export function useLoginUser(setToken) {
  console.log(setToken)
  const { data: csrfToken } = useCsrfToken()
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
