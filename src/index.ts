import { ApolloServer } from 'apollo-server'
import typeDefs from './schema/typeDefs'
import resolvers from './schema/resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
