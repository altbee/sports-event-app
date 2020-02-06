import { client } from './apollo'

export const cacheSetLoggedIn = () => client.writeData({
  data: {
    auth: {
      __typename: 'auth',
      status: true,
    },
  },
})

export const cacheSetLoggedOut = () => client.writeData({
  data: {
    auth: {
      __typename: 'auth',
      status: false,
    },
  },
})
