var SibApiV3Sdk = require('sib-api-v3-sdk')

var defaultClient = SibApiV3Sdk.ApiClient.instance

var apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.SENDINBLUE_API_KEY

exports.handler = function (event) {
  var api = new SibApiV3Sdk.ContactsApi()

  var createContact = new SibApiV3Sdk.CreateContact()

  createContact = {
    email: event.queryStringParameters.email,
    listIds: [75],
  }

  return api
    .createContact(createContact)
    .then(
      (data) => ({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTION',
        },
        body: JSON.stringify(data),
      }),
      (data) => ({
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTION',
        },
        body: JSON.stringify(data),
      })
    )
    .catch((error) => ({
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTION',
      },
      body: JSON.stringify(error),
    }))
}
