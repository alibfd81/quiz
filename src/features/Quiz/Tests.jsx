import { useState } from "react"
import TotalScore from "./TotalScore"
import Questions from "./Questions"
import { questions } from "../../question/questions"


function Tests() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [incScore, setIncScore] = useState(0)
    const [decScore, setDecScore] = useState(0)
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
        if (selectAnswer === questions[currentQuestion].correctAnswer) {
            setIncScore(incScore + 1)
        } else {
            setDecScore(decScore + 1)
        }

        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
    }
    const handlePrev = () => {
        setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev)); // سوال قبلی
    };
    return (
        <div>

            {
                showScore ? <TotalScore incScore={incScore} decScore={decScore} /> : <Questions handlePrev={handlePrev} currentQuestion={currentQuestion} onClickNext={onClickNext} />
            }
        </div>
    )
}

export default Tests
