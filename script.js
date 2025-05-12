const quizData = [
  { question: "Какой тип данных используется для хранения целых чисел в Python?", answers: ["str", "float", "int", "bool"], correct: "int" },
  { question: "Как создать список в Python?", answers: ["{}", "[]", "()", "<>"], correct: "[]" },
  { question: "Какой тег HTML делает текст жирным?", answers: ["<i>", "<p>", "<b>", "<u>"], correct: "<b>" },
  { question: "Какой HTTP-метод используется для отправки формы?", answers: ["GET", "POST", "PUT", "DELETE"], correct: "POST" },
  { question: "Что означает аббревиатура CSS?", answers: ["Central Style Sheet", "Cascading Style Sheet", "Creative Style Syntax", "Computer Style System"], correct: "Cascading Style Sheet" },
  { question: "Как объявить переменную в JavaScript?", answers: ["let", "var", "const", "все перечисленные"], correct: "все перечисленные" },
  { question: "Какой символ обозначает комментарий в Python?", answers: ["#", "//", "--", "/* */"], correct: "#" },
  { question: "Какой тег HTML создаёт ссылку?", answers: ["<a>", "<link>", "<href>", "<url>"], correct: "<a>" },
  { question: "Как получить данные из API с помощью fetch?", answers: ["fetch.get()", "fetch('url')", "fetch.send()", "fetch.request()"], correct: "fetch('url')" },
  { question: "Какая функция выводит данные в консоль Python?", answers: ["print()", "console.log()", "echo()", "write()"], correct: "print()" }
];

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});

  const handleAnswer = (selected) => {
    const newAnswers = { ...selectedAnswers, [currentQuestion]: selected };
    setSelectedAnswers(newAnswers);

    if (selected === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswers({});
  };

  return (
    <div className="container">
      {showResult ? (
        <div className="result">
          <h2>🎉 Тест завершён!</h2>
          <p>Вы ответили правильно на <strong>{score}</strong> из {quizData.length} вопросов.</p>

          <div className="answers-list">
            {quizData.map((item, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === item.correct;

              return (
                <div key={index} className="answer-item">
                  <p><strong>{index + 1}. {item.question}</strong></p>
                  <p>Ваш ответ: <span className={isCorrect ? "correct" : "wrong"}>{userAnswer || "Не выбрано"}</span></p>
                  {!isCorrect && <p>Правильный ответ: <span className="correct">{item.correct}</span></p>}
                </div>
              );
            })}
          </div>

          <button onClick={restartQuiz}>Пройти снова</button>
        </div>
      ) : (
        <div>
          <h2>Вопрос {currentQuestion + 1} / {quizData.length}</h2>
          <p><strong>{quizData[currentQuestion].question}</strong></p>
          {quizData[currentQuestion].answers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswer(answer)}>
              {answer}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<QuizApp />);