

import ApolloClient from 'apollo-boost'

import { getToken } from '../utils/auth'

export const lala = ''

export const client = new ApolloClient({
  uri: 'http://206.189.126.224:4000/',
  request: async (operation) => {
    const token = await getToken()

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
  clientState: {
    defaults: {
      auth: {
        __typename: 'auth',
        status: false,
      },
    },
  },
})
