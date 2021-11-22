import { useQuery } from 'react-query'
import axios from 'axios'

export function useFacteursEmission() {
  return useQuery(['facteuremission'], () =>
    axios.get(`/data/emission-factors.json`).then((res) => res.data)
  )
}
