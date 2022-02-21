import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  realm: process.env.REACT_APP_IDP_REALM || 'integration',
  url: process.env.REACT_APP_IDP_AUTH_URL || 'https://int-moncompte.ademe.fr/auth',
  clientId: 'bilansclimatsimplifies',
})

export default keycloak
