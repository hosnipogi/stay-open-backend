import { TodoType, TodoStatus, COLLECTION } from '../types'
import admin from '../firebase'

function toggleStatus(status: TodoStatus) {
  return status === TodoStatus.COMPLETE
    ? TodoStatus.INPROGRESS
    : TodoStatus.COMPLETE
}

const resolvers = {
  Query: {
    async todos() {
      const todos = await admin.firestore().collection('todos').get()
      return todos.docs.map((todo) => {
        const data = todo.data()
        const dateCreated = todo.createTime.seconds
        const dateLastUpdated = todo.updateTime.seconds
        const id = todo.id
        return {
          ...data,
          id,
          dateCreated,
          dateLastUpdated,
        }
      }) as TodoType[]
    },
  },
  Mutation: {
    async addTodo(p, args) {
      const snapshot = await admin
        .firestore()
        .collection(COLLECTION.TODOS)
        .add({
          status: TodoStatus.INPROGRESS,
          title: args.title,
        } as Omit<TodoType, 'dateCreated' | 'dateLastUpdated' | 'id'>)

      const dateCreated = (await snapshot.get()).createTime.seconds
      const dateLastUpdated = (await snapshot.get()).updateTime.seconds

      return {
        id: snapshot.id,
        dateCreated,
        dateLastUpdated,
      } as TodoType
    },
    async updateTodo(p, args) {
      const snapshot = await admin
        .firestore()
        .collection(COLLECTION.TODOS)
        .doc(args.id)
        .get()
      const todo = snapshot.data()
      const todoStatus = todo.status
      const updatedStatus = toggleStatus(todoStatus)
      const result = snapshot.ref.update({ status: updatedStatus })

      return {
        status: updatedStatus,
        dateLastUpdated: (await result).writeTime.seconds,
      }
    },
    async deleteTodo(p, args) {
      const snapshot = await admin
        .firestore()
        .collection(COLLECTION.TODOS)
        .doc(args.id)
        .delete()
      return true
    },
  },
}

export default resolvers
