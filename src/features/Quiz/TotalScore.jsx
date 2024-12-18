import { useEffect, useState } from "react";
import axios from "axios";
import { questions } from "../../question/questions";

function TotalScore() {
    const [score, setScore] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [unanswered, setUnanswered] = useState(0);
    const [percentage, setPercentage] = useState(0)
    useEffect(() => {
        const savedAnswer = JSON.parse(localStorage.getItem("answers"));
        if (savedAnswer) {
            let correctCount = 0;
            let wrongCount = 0;
            let unansweredCount = 0;

            questions.forEach((question, index) => {
                const answer = savedAnswer[index];

                if (answer === undefined || answer === null || answer === "") {
                    unansweredCount++; // اگر جواب ذخیره نشده است
                } else if (answer === question.correctAnswer) {
                    correctCount++; // اگر جواب صحیح است
                } else {
                    wrongCount++; // اگر جواب اشتباه است
                }
            });

            setScore(correctCount);
            setWrongAnswer(wrongCount);
            setUnanswered(unansweredCount);
            setPercentage(((score * 3) - wrongAnswer) / (questions.length * 3) * 100)
        }
    }, [score, wrongAnswer, unanswered]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://6756c857c0a427baf94a5db1.mockapi.io/quiz/users");
                const user = JSON.parse(localStorage.getItem("user"));
                const userDetail = data.find(u => u.number === user.number);
                const { id } = userDetail;
                axios.put(`https://6756c857c0a427baf94a5db1.mockapi.io/quiz/users/${id}`, { percentage: percentage });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [score, wrongAnswer, unanswered, percentage]);

    return (
        <div className="background">
            <div className="bg-white m-6 p-6 rounded-lg w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3">
                <p>تعداد سوالات درست: {score}</p>
                <p>تعداد سوالات غلط: {wrongAnswer}</p>
                <p>تعداد سوالات نزده: {unanswered}</p>
                <p>درصد بدست آمده ی شما: %{percentage.toFixed(1)}</p>
            </div>
        </div>
    );
}

export default TotalScore;
