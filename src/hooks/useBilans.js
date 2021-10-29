import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export function useBilans() {
  return useQuery(['bilans'], () =>
    axios.get(`${apiUrl}/bilans.json`).then((res) => res.data)
  )
}
export function useBilan(id) {
  return useQuery(['bilan', id], () =>
    axios.get(`${apiUrl}/bilan.json`).then((res) => res.data)
  )
}

export function useBilansMutation(id) {
  const queryClient = useQueryClient()
  return useMutation(
    (bilan) => axios.get(`${apiUrl}/bilans.json#${id || ''}`, bilan),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['bilans'])
      },
    }
  )
}
