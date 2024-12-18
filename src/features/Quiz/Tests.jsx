import { useState } from "react"
import TotalScore from "./TotalScore"
import Questions from "./Questions"
import { questions } from "../../question/questions"


function Tests() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const onClickNext = (selectAnswer) => {
        if (selectAnswer === "") {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
            }
            return;
        }

        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
    }
    const handlePrev = (e) => {
        e.preventDefault()
        setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev)); // سوال قبلی
    };
    return (
        <div>

            {
                showScore ? <TotalScore /> : <Questions handlePrev={handlePrev} currentQuestion={currentQuestion} onClickNext={onClickNext} />
            }
        </div>
    )
}

export default Tests
