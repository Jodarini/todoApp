import { useState, type ChangeEvent, type FormEvent } from 'react'

interface todos {
  title: string
  edit: boolean
  id: number
}

let idTracker = 2
export const App = () => {
  const [height, setHeight] = useState('')
  const [todos, setTodos] = useState<todos[]>([
    { title: 'Todo 1', id: 0, edit: false },
    {
      title: 'Todo 2',
      id: -50,
      edit: false
    }
  ])

  const handleTodoChange = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
    todoId: number
  ) => {
    const newHeight = e.target.scrollHeight
    setHeight(String(newHeight))
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, title: e.target.value }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const changeToInput = (
    e:
      | React.FocusEvent<HTMLTextAreaElement, Element>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    todoId: number
  ) => {
    const newHeight = e.target.scrollHeight
    setHeight(String(newHeight))
    const updatedTodos = todos.map((curr) => {
      if (curr.id === todoId) {
        return { ...curr, edit: !curr.edit }
      }
      return curr
    })
    setTodos(updatedTodos)
  }

  const deleteTodo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todoId: number
  ) => {
    e.stopPropagation()
    const newTodos = todos.filter((todo) => {
      return todo.id !== todoId
    })

    setTodos(newTodos)
  }

  const handleAddTodo = () => {
    setHeight('1rem')
    setTodos([{ title: '', edit: true, id: idTracker++ }, ...todos])
  }

  return (
    <main className="flex flex-col gap-4 p-4 justify-center ">
      <h1 className="text-2xl">Todo App</h1>

      <section>
        <button
          className="border border-white text-2xl rounded-full w-8 h-8"
          onClick={() => {
            handleAddTodo()
          }}
        >
          +
        </button>
        <ul className="flex flex-col">
          {todos.map((todo: todos, index) => (
            <li
              key={index}
              className="border-b rounded-bl-[270px_2px] rounded-br-[270px_2px] border-sky-800 bg-transparent p-2 m-px[5px]"
            >
              {todo.edit ? (
                <textarea
                  className="resize-none outline-none scrollbar-none bg-transparent w-full h-auto overflow-y-auto"
                  style={{ height }}
                  onBlur={(e) => {
                    changeToInput(e, todo.id)
                  }}
                  value={todo.title}
                  autoFocus
                  onChange={(e) => {
                    handleTodoChange(e, todo.id)
                  }}
                />
              ) : (
                <div
                  className="flex justify-between w-full"
                  onClick={(e) => {
                    changeToInput(e, todo.id)
                  }}
                >
                  <span className="break-words w-11/12">{todo.title}</span>
                  <button
                    onClick={(e) => {
                      deleteTodo(e, todo.id)
                    }}
                  >
                    x
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
