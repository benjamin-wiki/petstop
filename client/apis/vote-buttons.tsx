import request from 'superagent'

export async function addVote({
  petId,
  token,
}: {
  petId: number
  token: string
}): Promise<void> {
  await request
    .post(`/api/v1/pets/${petId}/votes`)
    .set('Authorization', `Bearer ${token}`)
}
