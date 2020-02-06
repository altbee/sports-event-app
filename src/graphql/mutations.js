import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    loginUser(data: {
      email: $email,
      password: $password,
    }) {
      token
      user {
        name
        id
      }
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation createUser (
    $name: String!
    $email: String!,
    $password: String!
    $gender: Gender!
    $dob: String!
  ) {
    createUser(data: {
      name: $name,
      email: $email,
      password: $password,
      gender: $gender,
      dob: $dob,
    }) {
      token
      user {
        name
        id
      }
    }
  }
`
