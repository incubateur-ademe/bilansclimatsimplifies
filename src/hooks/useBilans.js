import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export function useBilans() {
  return useQuery('bilans', () =>
    axios.get(`${apiUrl}/bilans/`).then((res) => res.data)
  )
}
export function useBilan(id) {
  return useQuery(['bilan', id], () =>
    axios.get(`${apiUrl}/bilans/${id || ''}`).then((res) => res.data)
  )
}
export function useBilansCreation() {
  const queryClient = useQueryClient()
  return useMutation((bilan) => axios.post(`${apiUrl}/bilans/`, bilan), {
    onSettled: () => {
      queryClient.invalidateQueries('bilan')
    },
  })
}
export function useBilansMutation(id) {
  const queryClient = useQueryClient()
  return useMutation((bilan) => axios.patch(`${apiUrl}/bilans/${id}`, bilan), {
    onSettled: () => {
      queryClient.invalidateQueries('bilan')
    },
  })
}
export function useBilansDeletion(id) {
  const queryClient = useQueryClient()
  return useMutation(() => axios.delete(`${apiUrl}/bilans/${id || ''}`), {
    onSettled: () => {
      queryClient.invalidateQueries('bilan')
    },
  })
}
