import { useEffect, useState } from "react";
import axios from "axios";
import { questions } from "../../question/questions";

function TotalScore({ incScore, decScore }) {
    const [unanswerd, setUnanswerd] = useState();
    const totalquestions = questions.length;

    // مقداردهی پیش‌فرض به incScore و decScore اگر undefined باشند
    const validIncScore = incScore ?? 0;
    const validDecScore = decScore ?? 0;

    // محاسبه درصد
    const percentage = ((validIncScore * 3) - validDecScore) / (totalquestions * 3) * 100;

    useEffect(() => {
        if (validIncScore === 0 && validDecScore === 0) {
            setUnanswerd(totalquestions);
        } else {
            setUnanswerd(totalquestions - (validIncScore + validDecScore));
        }
    }, [validIncScore, validDecScore]);

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
    }, [percentage]);

    return (
        <div className="background">
            <div className="bg-white m-6 p-6 rounded-lg w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3">
                <p>تعداد سوالات درست: {validIncScore}</p>
                <p>تعداد سوالات غلط: {validDecScore}</p>
                <p>تعداد سوالات نزده: {unanswerd}</p>
                <p>درصد بدست آمده ی شما: %{percentage.toFixed(1)}</p>
            </div>
        </div>
    );
}

export default TotalScore;
