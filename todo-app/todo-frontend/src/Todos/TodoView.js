import React, { useEffect, useState } from 'react'
import axios from '../util/apiClient'

import List from './List'
import Form from './Form'

const TodoView = () => {
  const [todos, setTodos] = useState([])
  const backend_url = process.env.REACT_APP_BACKEND_URL

  const refreshTodos = async () => {
    const { data } = await axios.get(backend_url)
    setTodos(data)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  const createTodo = async (todo) => {
    const { data } = await axios.post(backend_url, todo)
    setTodos([...todos, data])
  }

  const deleteTodo = async (todo) => {
    await axios.delete(`${backend_url}${todo._id}`)
    refreshTodos()
  }

  const completeTodo = async (todo) => {
    await axios.put(`${backend_url}${todo._id}`, {
      text: todo.text,
      done: true
    })
    refreshTodos()
  }

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </>
  )
}

export default TodoView
