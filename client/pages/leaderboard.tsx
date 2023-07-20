import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { rankPets } from '../apis/pets-leaderboard'

export default function Leaderboard() {
  const {
    data: listData,
    error,
    isLoading,
  } = useQuery(['pets'], () => rankPets())
  if (error) {
    return <div>Unexpected E-rawr</div>
  }

  if (!listData || isLoading) {
    return (
      <div>
        <h1>loading data</h1>
      </div>
    )
  } else
    return (
      <div
        className="mt-8 space-y-4 pt-6 text-center md:p-8"
        style={{ backgroundColor: '#7FFFD4' }}
      >
        <header>
          <h1 className="inline-block border-b-4 border-b-purple font-header text-5xl">
            Leaderboard
          </h1>
        </header>
        <ol>
          {listData.map((rankPets) => (
            <li key={rankPets.name}>
              <p className="font-header text-lg">Name: {rankPets.name} </p>
              <p className="font-header text-lg">Points: {rankPets.points}</p>
              <Link to={'/pets/' + rankPets.id}>
                <img
                  className=" mx-auto rounded-lg shadow-2xl hover:shadow-indigo-500/100"
                  src={rankPets.imageUrl}
                  alt={rankPets.name + ' the ' + rankPets.animal}
                  width={400}
                />
                <br />
                <br />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    )
}
