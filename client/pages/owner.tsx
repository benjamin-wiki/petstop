import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { fetchOwnerPets } from '@/apis/owners-pets'
import { Spinner } from '@/components/layout/spinner'

export default function MyPets() {
  const { id } = useParams()

  console.log(id)

  const {
    data: pets,
    error,
    isLoading,
  } = useQuery(['pets', id], () =>
    id ? fetchOwnerPets(id) : Promise.resolve(null)
  )

  if (error) {
    return <div>ERROR</div>
  }

  if (!pets || isLoading) {
    return <Spinner />
  }

  return (
    <div className="container mt-8 max-w-screen-sm">
      <h1 className="mb-4 inline-block border-b-4 border-b-orange font-header text-3xl">
        List of pets:{' '}
      </h1>
      <ul className="justify-evenly text-xs transition-colors">
        {pets.map((pet) => (
          <li key={pet.id} className="mb-8">
            <h2 className="font-header text-xl">
              {pet.name} is a {pet.animal}!
            </h2>
            <img
              className="aspect-square flex-row border-y-fuchsia-400 object-cover"
              width="640"
              src={pet.imageUrl}
              alt="Pet"
            ></img>
            <p className="font-header text-xl">Current points: {pet.points}</p>
            <p>{pet.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
