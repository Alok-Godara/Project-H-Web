import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold">Hello World</h1>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setCount(count + 1)}>
        Count is {count}
      </button>
    </>
  )
}

export default App
