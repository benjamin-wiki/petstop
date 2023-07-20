import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { getRandomPets } from '../../apis/random-pet-homepage'
import VoteButton from '../vote-buttons'
import { Spinner } from './spinner'

export default function OnePets() {
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery(
    ['random', 'count', 1],
    () => getRandomPets(1),
    {
      refetchOnWindowFocus: false,
    }
  )

  if (error) {
    return <div className="text-red">There was an error</div>
  }

  if (isLoading || !data) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  const pet = data[0]

  return (
    <section className="flex-col items-center justify-center">
      <button
        className="text-grey my-8 rounded-full border-black bg-blue px-4 py-2 font-bold hover:bg-purple"
        onClick={() => queryClient.invalidateQueries(['random'])}
      >
        Skip
      </button>
      <div className="mx-auto w-[500px] text-left">
        <img
          key={pet.id}
          src={pet.imageUrl}
          alt={pet.name}
          width="500"
          className="mt-0 aspect-square rounded-lg object-cover"
        />
        <Link
          to={`/pets/${pet.id}`}
          className="mt-2 font-header text-4xl decoration-2 hover:underline"
        >
          {pet.name}
        </Link>
        <p className=" font-header text-muted-foreground">
          {pet.points} points
        </p>
        {pet.bio.split('\n\n').map((paragraph, index) => (
          <p className="mt-4" key={index}>
            {paragraph}
          </p>
        ))}

        <div className="mt-2">
          <VoteButton petId={pet.id} />
        </div>
      </div>
    </section>
  )
}
