import gql from 'graphql-tag'

export const ME_QUERY = gql`
  query {
    me {
      id
      name
      email
      dob
    }
  }
`

export const CACHE_AUTH_QUERY = gql`
  query auth {
    auth @client {
      status
    }
  }
`

export const ACTIVITIES_QUERY = gql`
  query {
    activities {
      id
      name
      featured
    }
  }
`
