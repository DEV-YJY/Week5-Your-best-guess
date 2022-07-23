import React, { useState, useEffect } from 'react'
import request from 'superagent'
import Animal from './Animal'
import Score from './Score'

let COUNT = 20

const App = () => {
  const [animal, setAnimal] = useState('')
  const [counter, setCounter] = useState(COUNT)
  const [scores, setScore] = useState([0, 0])
  const [isTeamA, setTeamA] = useState(true)

  function getAnimal() {
    return request
      .get('https://zoo-animal-api.herokuapp.com/animals/rand')
      .then((res) => {
        setAnimal(res.body)
        return null
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAnimal()
  }, [])

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  function handleNextAnimal(e) {
    getAnimal()
    if (e.target.className.includes('Next')) {
      let teamAScore = scores[0]
      let teamBScore = scores[1]
      if (isTeamA) {
        setScore([teamAScore + 1, teamBScore])
      } else {
        setScore([teamAScore, teamBScore + 1])
      }
    }
  }

  function handleReset() {
    setTeamA(true)
    setScore([0, 0])
    setCounter(COUNT)
  }

  function handleSwap() {
    setTeamA(!isTeamA)
    setCounter(COUNT)
    getAnimal()
  }

  return (
    <main className="flex flex-wrap justify-center  mb-3">
      <div className="flex justify-center">
        <h2 className="font-medium leading-tight text-5xl">
          Your Best Guess! 🤔
        </h2>
      </div>

      <div className="flex flex-row justify-center w-5/6 border-neutral-800 border-2">
        <div className="flex flex-col w-1/3 h-2/3 p-3">
          <Animal data={animal} />
        </div>
        <fieldset className="flex flex-col w-1/3 p-3 border font-semibold ">
          <button
            onClick={(e) => handleNextAnimal(e)}
            className="Next m-3 inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-2xl leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Next animal
          </button>
          <button
            onClick={(e) => handleNextAnimal(e)}
            className="Skip m-3 inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-2xl leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Skip animal
          </button>
          {counter > 0 ? (
            <div></div>
          ) : (
            <>
              <button
                onClick={handleSwap}
                className="m-3 inline-block px-6 py-2 border-2 border-yellow-600 text-yellow-600 font-medium text-2xl leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Swap Team
              </button>
              <button
                onClick={handleReset}
                className="m-3 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-2xl leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                New game
              </button>
            </>
          )}
        </fieldset>
        <div className="flex flex-col w-1/3 p-3">
          <div className="flex flex-row justify-content">
            <img className="w-16 h-16" alt="timer icon" src="/timer.png" />
            <button className="mx-4 px-6 py-2 border-2 border-black text-black font-semibold text-3xl uppercase rounded">
              {counter}
            </button>
            <img className="w-16 h-16" alt="timer icon" src="/timer.png" />
          </div>

          <div className="font-semibold py-4">
            <Score counter={counter} isTeamA={isTeamA} scores={scores} />
          </div>

          <div>
            New to charades? &nbsp;
            <a
              className="underline"
              href="https://github.com/mako-goblin-2022/your-best-guess"
            >
              Read the rules on Github.
            </a>
          </div>
        </div>
      </div>
      <footer className="text-xl font-light">
        Produced with 🫀 by the Red Crested Bustards.
      </footer>
    </main>
  )
}
// When we get timer reset button
// Update score state to listen to team state
// Call setTeam with (A, B)

export default App
