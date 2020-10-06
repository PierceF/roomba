import React from 'react';

let finalPosition = ""
let dirtCollected = 0
let totalDistance = 0
let totalWallHits = 0


const roombaMovement = (direction , initialRoombaLocation, roomSize, dirtLocations) => {

  let wallHit = 0;
  const roombaLocation = initialRoombaLocation
  const x = roombaLocation[0]
  const y = roombaLocation[1]
  const max_x = roomSize[0]
  const max_y = roomSize[1]
  const mRoombaLocation = roombaLocation.join();
  const mDirtLocations = dirtLocations.join('-').split('-')

  if (mDirtLocations.includes(mRoombaLocation)) {
    dirtCollected += 1
  }

  if (
    (x === 0 && direction==="W") ||
    (y === 0 && direction === "S") ||
    (max_x === x && direction==="E") ||
    (max_y === y && direction==="N")
   ) {
    wallHit += 1;
    ++totalWallHits
    direction = "";
  } else if (direction === "W" ) {
    roombaLocation[0] -= 1;
    ++totalDistance
  } else if (direction === "E") {
    roombaLocation[0] += 1;
    ++totalDistance
  } else if (direction === "S") {
    roombaLocation[1] -= 1;
    ++totalDistance
  } else {
    roombaLocation[1] += 1;
    ++totalDistance
    }

  finalPosition = `${roombaLocation[0]}, ${roombaLocation[1]}`

  return [`${roombaLocation}`, direction, dirtCollected, wallHit];
}


export const Record = props => (
  !props.rows || !props.rows.drivingInstructions ? null : (
       <div>
        <br />
        <table className="ui celled table" style={{textAlign: "center"}}>
          <thead>
            <tr>
              <th>Step</th>
              <th>Roomba Location</th>
              <th>Action</th>
              <th>Total Dirt Collected</th>
              <th>Total Wall Hits</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>{`${props.rows.initialRoombaLocation[0]}, ${props.rows.initialRoombaLocation[1]}`}</td>
              <td></td>
              <td>
                {
                  props.rows.dirtLocations.join('-').split('-').includes(props.rows.initialRoombaLocation.join()) ? dirtCollected+=1 : dirtCollected
                }
              </td>
              <td>0</td>
            </tr>
            {props.rows.drivingInstructions.map((val, ind) => {
              return (
                <tr key={val + ind}>
                  <td>{ind + 2}</td>
                  { roombaMovement(val, props.rows.initialRoombaLocation, props.rows.roomDimensions, props.rows.dirtLocations)
                    .map((data, i) => (<td key={data + i}>{data}</td>))
                  }
                </tr>
              )
          })}
          </tbody>
        </table>
        <br />
        <p>Final Position: {finalPosition}</p>
        <p>Total Dirt Collected: {dirtCollected}</p>
        <p>Total Distance Traveled: {totalDistance}</p>
        <p>Total Walls Hit: {totalWallHits}</p>
      </div>
  )
);

