import { useEffect, useState } from 'react'
import { getAllCountries } from '../services/countryApi'

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function Quiz() {
  const [countries, setCountries] = useState([])
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        const countriesWithFlags = data.filter(
          (country) => country.flags?.png && country.name?.common
        )

        const quizQuestions = shuffleArray(countriesWithFlags)
          .slice(0, 10)
          .map((country) => {
            const wrongAnswers = shuffleArray(
              countriesWithFlags.filter(
                (item) => item.name.common !== country.name.common
              )
            )
              .slice(0, 3)
              .map((item) => item.name.common)

            return {
              flag: country.flags.png,
              flagAlt: country.flags.alt || `Flagga för ${country.name.common}`,
              correctAnswer: country.name.common,
              options: shuffleArray([country.name.common, ...wrongAnswers]),
            }
          })

        setCountries(countriesWithFlags)
        setQuestions(quizQuestions)
      })
      .catch(() => {
        setError('Kunde inte ladda quizet')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  function handleAnswer(answer) {
    setSelectedAnswer(answer)

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((previousScore) => previousScore + 1)
    }
  }

  function handleNextQuestion() {
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedAnswer('')
    } else {
      setIsFinished(true)
    }
  }

  function restartQuiz() {
    const newQuestions = shuffleArray(countries)
      .slice(0, 10)
      .map((country) => {
        const wrongAnswers = shuffleArray(
          countries.filter((item) => item.name.common !== country.name.common)
        )
          .slice(0, 3)
          .map((item) => item.name.common)

        return {
          flag: country.flags.png,
          flagAlt: country.flags.alt || `Flagga för ${country.name.common}`,
          correctAnswer: country.name.common,
          options: shuffleArray([country.name.common, ...wrongAnswers]),
        }
      })

    setQuestions(newQuestions)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer('')
    setIsFinished(false)
  }

  if (loading) {
    return <p>Laddar quiz...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (isFinished) {
    return (
      <section className="quiz">
        <h2>Resultat</h2>
        <p>
          Du fick {score} av {questions.length} rätt.
        </p>

        <button type="button" onClick={restartQuiz}>
          Spela igen
        </button>
      </section>
    )
  }

  const question = questions[currentQuestion]

  return (
    <section className="quiz">
      <h2>Travel Quiz</h2>

      <p>
        Fråga {currentQuestion + 1} av {questions.length}
      </p>

      <img src={question.flag} alt={question.flagAlt} className="quiz-flag" />

      <div className="quiz-options">
        {question.options.map((option) => {
          let buttonClass = 'quiz-option'

          if (selectedAnswer) {
            if (option === question.correctAnswer) {
              buttonClass += ' correct'
            } else if (option === selectedAnswer) {
              buttonClass += ' wrong'
            }
          }

          return (
            <button
              key={option}
              type="button"
              className={buttonClass}
              onClick={() => handleAnswer(option)}
              disabled={Boolean(selectedAnswer)}
            >
              {option}
            </button>
          )
        })}
      </div>

      {selectedAnswer && (
        <button type="button" onClick={handleNextQuestion}>
          Nästa fråga
        </button>
      )}

      <p>Poäng: {score}</p>
    </section>
  )
}

export default Quiz