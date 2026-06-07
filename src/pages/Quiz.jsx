import { useEffect, useState } from 'react'
import { getAllCountries } from '../services/countryApi'

function Quiz() {
  const [countries, setCountries] = useState([])
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [questionNumber, setQuestionNumber] = useState(1)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [quizFinished, setQuizFinished] = useState(false)

  useEffect(() => {
    getAllCountries().then((data) => {
      const countriesWithFlags = data.filter((country) => {
        return country.flags && country.flags.png && country.name
      })

      setCountries(countriesWithFlags)
      createQuestion(countriesWithFlags)
    })
  }, [])

  function getRandomCountry(countryList) {
    const randomIndex = Math.floor(Math.random() * countryList.length)
    return countryList[randomIndex]
  }

  function shuffleAnswers(answerList) {
    return answerList.sort(() => Math.random() - 0.5)
  }

  function createQuestion(countryList) {
    const correctCountry = getRandomCountry(countryList)

    const wrongCountries = countryList
      .filter((country) => country.name.common !== correctCountry.name.common)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const answers = [
      correctCountry.name.common,
      wrongCountries[0].name.common,
      wrongCountries[1].name.common,
      wrongCountries[2].name.common,
    ]

    setQuestion(correctCountry)
    setOptions(shuffleAnswers(answers))
    setSelectedAnswer('')
  }

  function handleAnswer(answer) {
    setSelectedAnswer(answer)

    if (answer === question.name.common) {
      setScore(score + 1)
    }
  }

  function nextQuestion() {
    if (questionNumber === 10) {
      setQuizFinished(true)
    } else {
      setQuestionNumber(questionNumber + 1)
      createQuestion(countries)
    }
  }

  function restartQuiz() {
    setQuestionNumber(1)
    setScore(0)
    setQuizFinished(false)
    createQuestion(countries)
  }

  if (!question) {
    return <p>Laddar quiz...</p>
  }

  if (quizFinished) {
    return (
      <section className="quiz">
        <h2>Resultat</h2>
        <p>
          Du fick {score} av 10 rätt.
        </p>

        <button type="button" onClick={restartQuiz}>
          Spela igen
        </button>
      </section>
    )
  }

  return (
    <section className="quiz">
      <h2>Travel Quiz</h2>

      <p>
        Fråga {questionNumber} av 10
      </p>

      <img
        src={question.flags.png}
        alt={`Flagga för ${question.name.common}`}
        className="quiz-flag"
      />

      <div className="quiz-options">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="quiz-option"
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== ''}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <>
          <p>
            Rätt svar: <strong>{question.name.common}</strong>
          </p>

          <button type="button" onClick={nextQuestion}>
            Nästa fråga
          </button>
        </>
      )}

      <p>Poäng: {score}</p>
    </section>
  )
}

export default Quiz