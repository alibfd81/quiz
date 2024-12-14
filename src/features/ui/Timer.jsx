import { useEffect } from "react"

function Timer({ timeleft, setTimeLeft }) {
    useEffect(() => {
        if (timeleft === 0) return
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newtime = prevTime - 1
                localStorage.setItem("timeLeft", JSON.stringify(newtime))
                return newtime
            })

        }, 1000)
        return () => clearInterval(timer)
    }, [timeleft])
    return (
        <div className="p-5">
           <span className="text-white text-xl"> زمان باقی مانده: {timeleft}</span>
        </div>
    )
}

export default Timer
