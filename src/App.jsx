import { Route, Routes } from "react-router-dom"
import Auth from "./features/Auth/Auth"
import Tests from "./features/Quiz/Tests"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/tests" element={<Tests />} />
    </Routes>
  )
}

export default App
