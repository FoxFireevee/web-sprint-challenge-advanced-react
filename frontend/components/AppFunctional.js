import React, { useState } from 'react'
import axios from 'axios';

// Suggested initial states
const initialForm = {
  message: '',
  email: '',
  steps: 0,
  index: 4, // the index the "B" is at
}

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [data, setData] = useState(initialForm);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const row = Math.ceil((data.index + 1) / 3) 
    const column = data.index % 3 + 1
    // console.log([row, column])
    return [row, column]
  }
  
  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    // console.log(`Coordinates (${getXY()})`)
    return (`Coordinates (${getXY()})`)
  }
  
  function reset() {
    // Use this helper to reset all states to their initial values.
    {setData(initialForm)}
    // console.log(data)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    console.log('Whoops cant do that')
    setData({...data, message: `You can't go ${direction}`})
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    const row = getXY()[0];
    const column = getXY()[1];
    let newIndex = data.index
    const left = newIndex - 1
    const right = newIndex + 1
    const up = newIndex - 3
    const down = newIndex + 3

    

    // [0, 1, 2]
    // [3, 4, 5]
    // [6, 7, 8]

    if(evt === 'left' && column > 1) {
        console.log('left ran!', row, column)
        return setData({...data, steps: data.steps + 1, message: '', index: left});
    } else if(evt === 'right') {
      if(column < 3) {
        console.log('right ran!', row, column)
        return setData({...data, steps: data.steps + 1, message: '', index: right});
      }
    } else if(evt === 'up') {
      if(row > 1) {
        console.log('up ran!', row, column)
        return setData({...data, steps: data.steps + 1, message: '', index: up});
      }
    } else if(evt === 'down') {
      if(row < 3) {
        console.log('down ran!', row, column)
        return setData({...data, steps: data.steps + 1, message: '', index: down});
      }
    }

    // console.log(evt)
    return getNextIndex(evt)
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { type, value } = evt.target
    setData({...data, [type]: value})
  }

  async function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    try {
      const response = await axios.post('http://localhost:9000/api/result', {
        "x": getXY()[0],
        "y": getXY()[1],
        "steps": data.steps,
        "email": data.email
      })
      setData({...data, email: '', message: response.data.message})
      console.log(response.data.link)
    } catch (err) {
      setData({...data, message: err.response.data.message})
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({getXY()[1]}, {getXY()[0]})</h3>
        <h3 id="steps">You moved {data.steps} {data.steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === data.index ? ' active' : ''}`}>
              {idx === data.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{data.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => move('left')} id="left">LEFT</button>
        <button onClick={() => move('up')} id="up">UP</button>
        <button onClick={() => move('right')} id="right">RIGHT</button>
        <button onClick={() => move('down')} id="down">DOWN</button>
        <button onClick={() => reset()} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={data.email} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
