import { useNavigate } from "react-router";
import TextField from "../ui/TextField";
import { useEffect, useState } from "react";
import axios from "axios";
import Tests from "../Quiz/Tests";
function Auth() {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [authrized, setAuthrized] = useState(false)
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setAuthrized(true)
    } else {
      setAuthrized(false)
    }
  }, [])

  const navigate = useNavigate()
  const handleClick = async (e) => {
    if (!name) return
    if (!number) return
    navigate('/tests',{replace:true})
    e.preventDefault()
    const newPerson = { name, number }
    try {
      const { data } = await axios.post("https://6756c857c0a427baf94a5db1.mockapi.io/quiz/users", newPerson)
      localStorage.setItem("user", JSON.stringify(newPerson))
      setNumber("")
      setName("")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    authrized ?
      <Tests />
      :
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="mb-7  ml-10">برای ورود به آزمون ابتدا اطلاعات زیر را وارد نمایید :</h1>
        <form className="bg-gray-400 px-6 py-8 space-y-6 rounded-md">
          <TextField label="نام و نام خانوادگی  :" value={name} setValue={setName} type="text" />
          <TextField label="شماره همراه  :" value={number} setValue={setNumber} type="tel" />
          <button className="bg-blue-500 w-full py-3 px-4 rounded-lg text-white hover:shadow-lg shadow-blue-300" onClick={handleClick}>ورود به آزمون</button>
        </form>
      </div >
  )
}

export default Auth
