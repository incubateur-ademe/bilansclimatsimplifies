import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export function useBilans() {
  return useQuery(['bilans'], () =>
    axios.get(`${apiUrl}/bilans`).then((res) => res.data)
  )
}
export function useBilan(id) {
  return useQuery(['bilan', id], () =>
    axios.get(`${apiUrl}/bilans/${id || ''}`).then((res) => res.data)
  )
}

export function useBilansMutation(id) {
  const queryClient = useQueryClient()
  return useMutation(
    (bilan) => axios.get(`${apiUrl}/bilans/${id || ''}`, bilan),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['bilans'])
      },
    }
  )
}

export function useEmissions(bilan) {
  return useQuery(['emissions', bilan], () =>
    axios.get(`${apiUrl}/bilans/${bilan}/emissions`).then((res) => res.data)
  )
}

export function useEmissionsCreation() {
  const queryClient = useQueryClient()
  return useMutation(
    (emission) => axios.post(`${apiUrl}/emissions/`, emission),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['emissions'])
      },
    }
  )
}
export function useEmissionsMutation(id) {
  const queryClient = useQueryClient()
  return useMutation(
    (emission) => axios.patch(`${apiUrl}/emissions/${id}`, emission),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['emissions'])
      },
    }
  )
}
