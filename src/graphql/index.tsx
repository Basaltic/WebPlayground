import React, { useEffect } from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import {} from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
})

export default () => {
  useEffect(() => {
    client
      .query({
        query: gql`
          query Test {
            books {
              title
              author
            }
          }
        `,
      })
      .then(res => {
        console.log(res)
      })
  }, [])

  return <div>graphql</div>
}
