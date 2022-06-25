import { gql } from 'apollo-server'

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    status: Status!
    dateCreated: Int!
    dateLastUpdated: Int!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(title: String): Todo
    updateTodo(id: ID): Todo
    deleteTodo(id: ID): Boolean
  }

  enum Status {
    COMPLETE
    INPROGRESS
  }
`

export default typeDefs
