import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addVote } from '@/apis/vote-buttons'

export default function useVote() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  const addVoteMutation = useMutation(
    async (petId: number) => {
      const token = await getAccessTokenSilently()
      return addVote({ petId, token })
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(['random'])
      },
    }
  )

  return addVoteMutation
}
