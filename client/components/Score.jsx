import React from 'react'

const Score = (props) => {
  return (
    <>
      {props.counter === 0 
        ? <>
        <div className="border p-3 my-4 text-3xl">Team 🦄: {props.scores[0]}</div>
        <div className="border p-3 my-4 text-3xl">Team 🧚‍♀️: {props.scores[1]}</div>
        </>
        : props.isTeamA 
          ? <div className="border p-3 my-4 text-3xl">Team 🦄: {props.scores[0]}</div>
          : <div className="border p-3 my-4 text-3xl">Team 🧚‍♀️: {props.scores[1]}</div>
      }
    </>
  )
}

export default Score
