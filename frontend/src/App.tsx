import { useEffect, useState } from 'react'
import './App.css'
type Dragon = {
  id: number
  name: string
  size: string
  type: string
  strength: number
}

type RoundResult = {
  id: number
  damageTaken: number
}

const getDragons = async () => {
  const response = await fetch('http://localhost:4000/dragons')
  const data = await response.json()
  return data;
}

const getFightResult = async (dragonId1: number, dragonId2: number) => {
  const response = await fetch('http://localhost:4000/dragons/fight', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([dragonId1, dragonId2]),
  });
  const data = await response.json();
  return data;
};
   

function App() {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [selectedDragon1, setSelectedDragon1] = useState<number | null>(null);
  const [dragon1Health, setDragon1Health] = useState<number>(100)
  const [dragon2Health, setDragon2Health] = useState<number>(100)
  const [selectedDragon2, setSelectedDragon2] = useState<number | null>(null);
  const [roundResults, setRoundResult] = useState<RoundResult[] | null>(null);

  useEffect(() => {
    getDragons().then(data => {
      setDragons(data)
    })

  }, [])

  const onClick = async () => {
    if (selectedDragon1 !== null && selectedDragon2 !== null) {
      const result = await getFightResult(selectedDragon1, selectedDragon2);
      setRoundResult(result);
      setDragon1Health( dragon1Health - result[0].damageTaken)
      setDragon2Health( dragon2Health - result[1].damageTaken)
    } else {
      alert('Please select two dragons to fight.');
    }
  };


  return (
    <>
      <p>Select two dragons to fight:</p>
      <div>
        <label>
          Dragon 1:
          <select
            value={selectedDragon1 ?? ''}
            onChange={e => setSelectedDragon1(Number(e.target.value))}
          >
            <option value="" disabled>Select a dragon</option>
            {dragons.map(dragon => (
              <option key={dragon.id} value={dragon.id}>
                {dragon.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Dragon 2:
          <select
            value={selectedDragon2 ?? ''}
            onChange={e => setSelectedDragon2(Number(e.target.value))}
          >
            <option value="" disabled>Select a dragon</option>
            {dragons.map(dragon => (
              <option key={dragon.id} value={dragon.id}>
                {dragon.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={onClick}>Fight</button>
      {roundResults && (
        roundResults.map(result => 
          <p>{`Dragon ${result.id} took ${result.damageTaken} damage`}</p>
        )
      )}
      {(dragon1Health > 0 && dragon2Health > 0) && 
        `${dragon1Health} - ${dragon2Health}`
      }
      {(dragon1Health <= 0 || dragon2Health <= 0) &&
        `The fight is over.`      
      }
      
    </>
  )
}
export default App
