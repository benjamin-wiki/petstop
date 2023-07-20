import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

import { getPetById } from '@/apis/pet-by-id'

export default function Pet() {
  const { id: petId } = useParams<{ id: string }>()

  const {
    data: pet,
    isError,
    isLoading,
  } = useQuery(['pets', petId], () => getPetById(petId as string))

  if (isError) {
    return <div>ERROR</div>
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <div className={`m-0 h-full w-full`}>
        <img
          className="fixed left-0  h-full w-full object-cover blur-md"
          src={pet.imageUrl}
          alt="animal"
        />
      </div>
      <div className={`relative mt-6 flex items-center pt-60 text-center`}>
        <img
          className="float-left mx-auto mb-8 mt-8 h-96 w-96 rounded-sm border-none bg-white/50 bg-contain object-cover p-8"
          src={pet.imageUrl}
          alt={pet.animal}
        ></img>
        <div className="font-mono float-right mx-auto max-w-3xl text-lg">
          <div className=" bg-white/50 p-8 text-3xl">
            <h1 className="mb-6 inline-block border-b-4 border-b-orange font-header text-6xl">
              {pet.name} ({pet.animal})
            </h1>
            <div className=" mb-4 font-bold">Points</div>
            <div className="mb-7">{pet.points}</div>
            <div className="mb-4 font-bold">Bio</div>
            <div className="mb-7 text-left">{pet.bio}</div>
            <Link to={'/owners/' + pet.ownerId} className="hover:underline">
              Owner&apos;s Page
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
