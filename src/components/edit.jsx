import { useState } from "react"

export default function Edit({todo, onSubmit}) {
  const [value, setValue] = useState(todo.text)

  function handleSubmit(e) {
    onSubmit(e, todo.id, value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
    </form>
  )
}
