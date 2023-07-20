import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getRandomPets } from '../../apis/random-pet-homepage'
import VoteButton from '../vote-buttons'
import { FullPageSpinner } from './spinner'

export default function TwoPets() {
  const queryClient = useQueryClient()
  const {
    data: pets,
    isLoading,
    error,
  } = useQuery(['random', 'count', 2], () => getRandomPets(2), {
    refetchOnWindowFocus: false,
  })

  if (error) {
    return <div className="text-red">There was an error</div>
  }

  if (isLoading || !pets) {
    return <FullPageSpinner />
  }

  return (
    <section className="flex-col justify-center">
      <button
        className="text-grey my-8 rounded-full border-black bg-blue px-4 py-2 font-bold hover:bg-purple"
        onClick={() => queryClient.invalidateQueries(['random'])}
      >
        Skip
      </button>
      <div className="grid grid-cols-2 gap-7">
        {pets.map((pet) => (
          <div className="text-left" key={pet.id}>
            <img
              key={pet.id}
              src={pet.imageUrl}
              alt={`${pet.name}, ${pet.animal}`}
              width="250"
              height="400"
              className="h-[250px] w-[400px] rounded-lg object-cover"
            />
            <p className="font-header">{pet.name}</p>

            {pet.bio.split('\n\n').map((paragraph, index) => (
              <p className="mt-4" key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-7">
        {pets.map((pet) => (
          <VoteButton petId={pet.id} key={pet.id} />
        ))}
      </div>
    </section>
  )
}
