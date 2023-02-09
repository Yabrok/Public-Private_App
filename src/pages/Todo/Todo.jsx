import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Modal } from "../../components/Modal/Modal"


export const TodoList = () => {

  const todoRef = useRef()
  const editedTodoRef = useRef('')

  const [todo, setTodo] = useState([])
  const [todoModal, setTodoModal] = useState(false)
  const [editId, setEditId] = useState('')




  const getTodos = async () => {
    const data = await axios.get('http://localhost:6060/todo')

    if (data) {
      setTodo(data.data)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  const handleTodo = (evt) => {
    evt.preventDefault()

    axios
      .post('http://localhost:6060/todo', {
        todoText: todoRef.current.value
      })
      .then(data => {
        if (data.status = 200) {
          getTodos()
        }
      })
      .catch(err => console.log(err))

    todoRef.current.value = ''
  }

  const todoDelete = (todoId) => {

    axios
      .delete(`http://localhost:6060/todo/${todoId}`)
      .then(data => {
        if (data.status == 200) {
          getTodos()
        }
      })
      .catch(err => console.log(err))
  }

  const handleEdit = (evt) => {
    evt.preventDefault()
    // console.log(editedTitleRef)
    // console.log(editedBodyRef)
    // console.log(editId)
    axios
      .put(`http://localhost:6060/todo/${editId}`,{
        todoText: editedTodoRef.current.value
      })
      .then(data => {
        if(data.status == 200){
          setTodoModal(false)
          getTodos()
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-center mb-4">Todo...</h1>

      <form onSubmit={(evt) => handleTodo(evt)} className='mb-4'>
        <div className="input-group w-50 mx-auto">
          <input required ref={todoRef} className="form-control" placeholder="What you to do?" type="text" />
          <button className="btn btn-success" type="submit">Add</button>
        </div>
      </form>
      {todo.length ? (
        <ul className="list-group w-50 mx-auto">
          {
            todo.map((item) => {
              return (
                <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
                  <p className="m-0 fw-bold">{item.todoText}</p>
                  <div>
                    <button
                      onClick={() => {
                        setEditId(item.id)
                        setTodoModal(true)
                      }}
                      className="btn btn-warning text-white me-2">Edit</button>
                    <button
                      onClick={() => todoDelete(item.id)} className="btn btn-danger text-white">Delete</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
      ) : ('')}
      {todoModal ? (
        <Modal modal={todoModal} setModal={setTodoModal} title='Edit todo' >
          <form onSubmit={(evt) => handleEdit(evt)}>
            <input ref={editedTodoRef} className="form-control mb-3" type="text" placeholder="Todo..." />
            <button className="btn btn-success" type="submit">Edit</button>
          </form>
        </Modal>
      ) : ('')}
    </div>
  )
}