import { useQuery } from 'react-query'
import axios from 'axios'

export function useFacteursEmission() {
  return useQuery(['facteuremission'], () =>
    axios
      .get(
        `https://bilansclimatsimplifies-staging.cleverapps.io/static/emission-factors.json`
      )
      .then((res) => res.data)
  )
}
