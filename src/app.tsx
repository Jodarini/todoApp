import { useState, type ChangeEvent, type FormEvent } from 'react'

interface todos {
  title: string
  edit: boolean
  id: number
}

let idTracker = 2
export const App = () => {
  const [todoTitle, setTodoTitle] = useState<todos['title']>('')
  const [todos, setTodos] = useState<todos[]>([
    { title: 'Todo 1', id: 0, edit: false },
    {
      title: 'Todo 2',
      id: -50,
      edit: false
    }
  ])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value)
  }

  const handleTodoChange = (
    e: ChangeEvent<HTMLInputElement>,
    todoId: number
  ) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, title: e.target.value }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTodos([...todos, { title: todoTitle, id: idTracker++, edit: false }])
    setTodoTitle('')
  }

  const changeToInput = (todoId: number) => {
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

  return (
    <main className="flex flex-col gap-4 p-4 items-center justify-center ">
      <h1 className="text-2xl">Todo App</h1>
      <section>
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <input
            className="bg-white/10 mb-1 border-transparent rounded-bl-[255px_15px] rounded-br-[15px_255px] rounded-tl-[255px_15px] rounded-tr-[15px_255px] p-2 m-px[5px]"
            type="text"
            value={todoTitle}
            onChange={(e) => {
              handleChange(e)
            }}
          />
        </form>
        <ul className="flex flex-col">
          {todos.map((todo: todos, index) => (
            <li
              key={index}
              className="border-b rounded-bl-[270px_2px] rounded-br-[270px_2px] border-sky-800 bg-transparent p-2 m-px[5px]"
            >
              {todo.edit ? (
                <input
                  type="text"
                  onBlur={() => {
                    changeToInput(todo.id)
                  }}
                  value={todo.title}
                  autoFocus
                  onChange={(e) => {
                    handleTodoChange(e, todo.id)
                  }}
                />
              ) : (
                <div
                  className="flex justify-between"
                  onClick={() => {
                    changeToInput(todo.id)
                  }}
                >
                  {todo.title}
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
