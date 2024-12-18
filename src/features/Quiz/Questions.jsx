import { useEffect, useState } from "react";
import Timer from "../ui/Timer";
import { questions } from "../../question/questions";
import TotalScore from "./TotalScore";

function Questions({ currentQuestion, onClickNext, handlePrev }) {
    const [timeleft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem("timeLeft");
        return savedTime ? JSON.parse(savedTime) : 100;
    });

    // بارگذاری پاسخ‌ها از localStorage در زمان رندر کامپوننت
    const [selectAnswer, setSelectAnswer] = useState(() => {
        const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
        return savedAnswers[currentQuestion] || ""; // مقدار پاسخ قبلی برای سوال جاری
    });

    const handleNext = (e) => {
        e.preventDefault();
        onClickNext(selectAnswer);

        // ذخیره پاسخ انتخابی در localStorage
        const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
        savedAnswers[currentQuestion] = selectAnswer;
        localStorage.setItem("answers", JSON.stringify(savedAnswers));
    };

    const handleAnswerChange = (item) => {
        // اگر کاربر تیک را برداشت، مقدار انتخابی خالی می‌شود
        if (selectAnswer === item) {
            setSelectAnswer("");
        } else {
            setSelectAnswer(item);
        }
    };

    useEffect(() => {
        // وقتی سوال تغییر می‌کند، مطمئن شوید که پاسخ قبلی برای سوال جدید بارگذاری می‌شود
        const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
        setSelectAnswer(savedAnswers[currentQuestion] || "");
    }, [currentQuestion]);

    return (
        <div className="background">
            {

                (timeleft === 0) ? <TotalScore /> :
                    <>
                        <Timer timeleft={timeleft} setTimeLeft={setTimeLeft} />
                        <div className="bg-white m-6 p-6 rounded-lg w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <p>گزینه صحیح را انتخاب کنید:</p>
                            <h2 className="mt-2">{questions[currentQuestion].question}</h2>
                            <form action="">
                                {questions[currentQuestion].choices.map((item) => (
                                    <div key={item} className="border-2 rounded-lg p-3 m-3 flex gap-x-1">
                                        <label>{item}</label>
                                        <input
                                            type="checkbox"
                                            name="question"
                                            value={item}
                                            onChange={() => handleAnswerChange(item)}
                                            checked={selectAnswer === item} // بررسی اینکه آیا پاسخ انتخابی با این گزینه برابر است
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-between">
                                    <button className="m-3 bg-slate-300 py-2 px-5 rounded-lg" onClick={handleNext}>
                                        بعدی
                                    </button>
                                    <button
                                        onClick={handlePrev}
                                        className="m-3 bg-slate-300 py-2 px-5 rounded-lg"
                                        disabled={currentQuestion === 0}
                                    >
                                        قبلی
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>

            }
        </div >
    );
}

export default Questions;
