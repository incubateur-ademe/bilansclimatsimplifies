import { useQuery } from 'react-query'
import axios from 'axios'

export function useFacteursEmission() {
  return useQuery(['facteuremission'], () =>
    axios
      .get(
        `https://bilansclimatsimplifies-staging.cleverapps.io/api/v1/emissionFactors/`
      )
      .then((res) => res.data)
  )
}
