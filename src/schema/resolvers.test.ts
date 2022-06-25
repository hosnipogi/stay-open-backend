import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

describe('ApolloServer', () => {
  it('works', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      mocks: true,
    })

    const result = await server.executeOperation({
      query: `query Todos {
        todos {
          id
          title
        }
      }`,
    })

    expect(result.errors).toBeUndefined()
    expect(result.data?.todos[0].title).toBe('Hello World')
  })
})
