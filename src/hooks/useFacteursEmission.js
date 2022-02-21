import { useQuery } from 'react-query'
import axios from 'axios'
import apiUrl from 'utils/apiUrl'

export function useFacteursEmission() {
  return useQuery(['facteuremission'], () =>
    axios
      .get(
        `${apiUrl}/emissionFactors/`
      )
      .then((res) => res.data)
  )
}
