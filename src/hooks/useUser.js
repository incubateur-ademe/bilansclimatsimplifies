import { useQuery, useMutation } from 'react-query'
import axios from 'axios'

import apiUrl, { baseUrl } from 'utils/apiUrl'

export function useUser(authenticated) {
  return useQuery(
    ['user'],
    () => axios.get(`${apiUrl}/ademeUser/`).then((res) => res.data),
    { enabled: authenticated ? true : false }
  )
}
export function useLoginUser() {
  const { data: csrfToken } = useCsrfToken()

  return useMutation((token) =>
    axios.post(
      `${apiUrl}/ademeUser/`,
      { token },
      {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        // faut que le header auth soit vide car l'utilisateur peut ne pas être déjà créé
        headers: { Authorization: '' },
      }
    )
  )
}

export function useCsrfToken() {
  return useQuery(['csrfToken'], () =>
    axios.get(`${baseUrl}/csrf/`).then((res) => res.data.csrfToken)
  )
}

export function useSignup() {
  const { data: csrfToken } = useCsrfToken()

  return useMutation((user) =>
    axios.post(`${apiUrl}/ademeAccount/`, user, {
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': csrfToken,
    })
  )
}
