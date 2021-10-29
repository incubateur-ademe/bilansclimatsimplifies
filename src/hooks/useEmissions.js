import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export function useEmissions() {
  return useQuery(['emissions'], () =>
    axios.get(`${apiUrl}/emissions.json`).then((res) => res.data)
  )
}

export function useEmissionsMutation(id) {
  const queryClient = useQueryClient()
  return useMutation(
    (emission) => axios.get(`${apiUrl}/emissions.json#${id || ''}`, emission),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['emissions'])
      },
    }
  )
}
