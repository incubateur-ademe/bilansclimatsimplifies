export const baseUrl =
  process.env.REACT_APP_BASE_URL ||
  'https://bilansclimatsimplifies-staging.cleverapps.io'

export const apiVersion = process.env.REACT_APP_API_VERSION || '/api/v1'

export default baseUrl + apiVersion
