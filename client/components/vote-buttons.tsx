import { useAuth0 } from '@auth0/auth0-react'

import useVote from '@/hooks/use-vote'

interface Props {
  petId: number
}

export default function VoteButton(props: Props) {
  const petId = Number(props.petId)

  const { user } = useAuth0()
  const addVoteMutation = useVote()

  if (!user) {
    return (
      <div className="text-red">Sorry, you need be to signed in to vote 😢</div>
    )
  }

  if (addVoteMutation.isError) {
    return (
      <div className="text-red">
        Sorry! There was an error trying to add your vote! 😢
      </div>
    )
  }

  async function handleClick() {
    addVoteMutation.mutate(petId)
  }

  return (
    <>
      <button
        className="text-grey rounded-full border-black bg-blue px-4 py-2 font-bold hover:bg-purple"
        onClick={handleClick}
      >
        {addVoteMutation.isSuccess
          ? 'Voted!'
          : addVoteMutation.isLoading
          ? 'Voting...'
          : 'Upvote! '}
      </button>
    </>
  )
}
