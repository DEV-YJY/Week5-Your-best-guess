import React from 'react'

const Animal = (props) => {
  return (
    <>
      <img
        className="object-fit p-1 border rounded"
        src={props.data.image_link}
        alt={props.data.name}
      />
      <ul className="font-light">
        <li className="text-xl">
          <span className="font-semibold">Animal:</span> {props.data.name}
        </li>
        <li className="text-xl">
          <span className="font-semibold">Category:</span>{' '}
          {props.data.animal_type}
        </li>
        <li className="text-xl">
          <span className="font-semibold">Habitat:</span> {props.data.habitat}
        </li>
      </ul>
    </>
  )
}

export default Animal
