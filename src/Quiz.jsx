import { useState } from "react";
import { resultInitialState } from './constant.js';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  // styles
  const selectedAnswer =
    "border rounded m-2 hover:cursor-pointer p-2 border-slate-800 text-white bg-black";
  const notSelected =
    "border rounded m-2 hover:cursor-pointer p-2 border-slate-300";

  const onAnswerClick = (choice, index) => {
    setAnswerIndex(index);
    if (choice === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = () => {
    setAnswerIndex(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onTryAgain =() => {
    setResult(resultInitialState)
    setShowResult(false)
  }

  return (
    // question box container
    <div className="box-border w-[500px] bg-slate-100 rounded-md mt-[100px] py-[30px] px-[60px]">
      {!showResult ? (
        <>
          {/* position of the question */}
          <span className="text-3xl font-bold text-black-500">
            {currentQuestion + 1}
          </span>
          <span className="text-2xl font-bold text-gray-300">
            /{questions.length}
          </span>

          {/* questions */}
          <h2 className="text-2xl font-extralight">{question}</h2>
          <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnswerClick(choice, index)}
                key={choice}
                className={
                  answerIndex === index ? selectedAnswer : notSelected
                }
              >
                {choice}
              </li>
            ))}
          </ul>

          <div>
            <button
              onClick={onClickNext}
              disabled={answerIndex === null}
              className={`border rounded bg-gray-800 text-white p-2 relative left-2 
                    ${
                      answerIndex === null
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100"
                    }`}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className='text-center'>
          <h3 className='text-xl font-bold text-center my-3'>Result</h3>
          <p className='my-3'>
            Total Score: {result.score}
          </p>
          <p className='my-3'>
            Total Questions: {questions.length}
          </p>
          <p className='my-3'>
            Correct Questions: {result.correctAnswers}
          </p>
          <p className='my-3'>
            Wrong Answers: {result.wrongAnswers}
          </p>
          <button className='border rounded bg-gray-800 text-white p-2 relative left-2'
                 onClick={onTryAgain}
          >Try Again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
